// app/api/auth/[...nextauth]/route.ts
import Shopify from "auth/providers/shopify";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Shopify({
            shopId: process.env.AUTH_SHOPIFY_SHOP_ID,
            clientId: process.env.AUTH_SHOPIFY_CLIENT_ID,
            clientSecret: process.env.AUTH_SHOPIFY_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token, }) {
            return { ...session, token }
        },
        // async jwt({ token, account, }) {
        //     if (account) {
        //         // set access_token to the token payload
        //         const { id_token, ...data } = account;
        //         token = {
        //             ...token,
        //             ...data,
        //         }
        //     }
        //     return token;
        // },
        async jwt({ token, account }) {
            try {
                if (account) {
                    console.log("Account", account)
                    // First-time login, save the `access_token`, its expiry and the `refresh_token`
                    return {
                        ...token,
                        access_token: account.access_token,
                        expires_at: account.expires_at,
                        refresh_token: account.refresh_token,
                    }
                } else if (Date.now() < token.expires_at * 1000) {
                    console.log("Token still valid")
                    // Subsequent logins, but the `access_token` is still valid
                    // throw new Error("Token still valid")
                    return token
                } else {
                    console.log("Token expired, trying to refresh it")
                    // Subsequent logins, but the `access_token` has expired, try to refresh it
                    if (!token.refresh_token) throw new TypeError("Missing refresh_token")

                    try {
                        // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
                        // at their `/.well-known/openid-configuration` endpoint.
                        // i.e. https://accounts.google.com/.well-known/openid-configuration
                        const response = await fetch(
                            `https://shopify.com/${process.env.AUTH_SHOPIFY_SHOP_ID}/auth/oauth/token`
                            , {
                                method: "POST",
                                body: new URLSearchParams({
                                    grant_type: "refresh_token",
                                    refresh_token: token.refresh_token,
                                    client_id: process.env.AUTH_SHOPIFY_CLIENT_ID,
                                    client_secret: process.env.AUTH_SHOPIFY_CLIENT_SECRET,
                                }),
                            })

                        const tokensOrError = await response.json()

                        if (!response.ok) throw tokensOrError

                        const newTokens = tokensOrError

                        token.access_token = newTokens.access_token
                        token.expires_at = Math.floor(
                            Date.now() / 1000 + newTokens.expires_in
                        )
                        // Some providers only issue refresh tokens once, so preserve if we did not get a new one
                        if (newTokens.refresh_token)
                            token.refresh_token = newTokens.refresh_token
                        return token
                    } catch (error) {
                        console.error("Error refreshing access_token", error)
                        // If we fail to refresh the token, return an error so we can handle it on the page
                        token.error = "RefreshTokenError"
                        return token
                    }
                }
            } catch (err) {
                console.log("Error", err)
                // signIn("shopify")
            }
        },
    },
});


