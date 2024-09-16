import type { TokenSet } from '@auth/core/types';
import type { OIDCConfig, OIDCUserConfig } from 'next-auth/providers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UntypedValue = any;

export interface ShopifyProfile extends Record<string, UntypedValue> {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  auth_time: number;
  device_uuid: string;
  sid: string;
  dest: string;
  email: string;
  email_verified: boolean;
}

export interface ShopifyOwnConfig {
  shopId: string | number;
  clientId: string;
  clientSecret: string;
  issuer?: string;
  shopifyOAuthPath?: string;
  shopifyCustomerGraphqlPath?: string;
  authUrl?: string;
}

export interface ShopifyConfig<P extends ShopifyProfile>
  extends ShopifyOwnConfig,
    Omit<OIDCConfig<P>, 'clientId' | 'clientSecret' | 'issuer'> {}

export type ShopifyUserConfig<P extends ShopifyProfile> = ShopifyOwnConfig &
  Partial<Omit<OIDCUserConfig<P>, 'options' | 'type'>>;

/**
 * This is the JWT returned by Shopify's customer API.
 */
export interface ShopifyJWTAuthorizationResponsePayload {
  shopId: string | number;
  cid: string;
  iat: number;
  exp: number;
  iss: string;
  sub: number;
  scope: 'openid email customer-account-api:full';
}

/**
 * This is the conformed JWT which will be actually validated.
 * Note that:
 *  - `aud` is originally missing, and it's expected to be the provider's `clientId`
 *  - `iss` is originally provided, but it's expected to be the provider's `issuer`
 */
export interface ShopifyJWTAuthorizationConformedPayload
  extends ShopifyJWTAuthorizationResponsePayload {
  aud: string;
}

export default function Shopify<P extends ShopifyProfile = ShopifyProfile>(
  options: ShopifyUserConfig<P>
): ShopifyConfig<P> {
  const {
    id = 'shopify',
    shopId,
    clientId,
    clientSecret,
    issuer = 'https://customer.login.shopify.com',
    shopifyOAuthPath = `https://shopify.com/${shopId}/auth/oauth`,
    shopifyCustomerGraphqlPath = `https://shopify.com/${shopId}/account/customer/api/2024-07/graphql`,
    // eslint-disable-next-line no-restricted-properties
    authUrl = process.env.AUTH_URL
  } = options;

  const redirectUri = `${authUrl}/api/auth/callback/${id}`;
  return {
    id,
    type: 'oidc',
    name: 'Shopify',
    clientId,
    clientSecret,
    issuer,
    authorization: {
      url: `${shopifyOAuthPath}/authorize`,
      params: {
        scope: 'openid email https://api.customers.com/auth/customer.graphql',
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri
      }
    },
    token: {
      url: `${shopifyOAuthPath}/token`,
      params: {
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: redirectUri
      },
      /**
       * This function gets the `id_token` from the response and conforms it so
       * that it passes validation by adding/modifying the necessary claims.
       *
       * This solution feels a bit hacky and I'm not really sure it's fully correct,
       * safe, or if it will work in all cases (or if it'll hold up in the future).
       *
       * Note that the transformation is done in the `conform` function itself,
       * but since the caller expects a new `Response` object to be returned,
       * we need to patch the received `Response` with a `json` method that returns
       * the transformed data.
       */
      async conform(response: Response) {
        if (!response.ok) {
          return;
        }
        //? Assuming a lot about the response here, as it should
        //? return a JSON object with an `id_token` property with
        //? a valid JWT token.
        const data: TokenSet = await response.clone().json();
        const [header = '', payload = '', sig = ''] = data.id_token?.split('.') ?? [];
        const responsePayload: ShopifyJWTAuthorizationResponsePayload = JSON.parse(atob(payload));
        const conformedPayload = {
          ...responsePayload,
          aud: clientId,
          iss: issuer,
          customerAccount: data
        };
        console.log('Conformed data:', data);
        const idToken = `${header}.${btoa(JSON.stringify(conformedPayload))}.${sig}`;
        //? Cloning the response again to patch it, though the caller already clones
        //? it before calling this function. This is done anyway in case this fact
        //? changes in the future and to avoid mutating the original response.
        console.log('Conformed JWTxx:', idToken);
        return Object.assign(response.clone(), {
          json() {
            return Promise.resolve({ ...data, id_token: idToken });
          }
        });
      }
    },
    async profile(profile, tokens) {
      const customer = tokens.access_token
        ? await fetch(shopifyCustomerGraphqlPath, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: tokens.access_token
            },
            body: JSON.stringify({
              operationName: 'GetCustomer',
              query: 'query { customer { displayName, imageUrl } }',
              variables: {}
            })
          })
            .then(
              (res) =>
                res.json() as Promise<{
                  data: {
                    customer: {
                      displayName: string;
                      imageUrl: string | null;
                    };
                  };
                }>
            )
            .then((res) => res?.data?.customer)
        : null;

      return {
        id: profile.sub,
        email: profile.email,
        emailVerified: profile.email_verified ? new Date() : null,
        image: customer?.imageUrl,
        name: customer?.displayName,
        tokens
      };
    },
    // @ts-expect-error: options not picked up, but they are defined in `OIDCConfig`
    options
  } satisfies ShopifyConfig<P>;
}
