import { TAGS } from 'lib/shopify/customer/constants';
import { shopifyCustomerFetch } from 'lib/shopify/customer/index';
import {
  CUSTOMER_DETAILS_QUERY,
  CUSTOMER_ORDER_QUERY
} from 'lib/shopify/customer/queries/customer';
import { CustomerDetailsData } from 'lib/shopify/customer/types';
import { auth } from 'auth';

// import { queryClient } from 'app/providers';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async function Page({ params }: { params: { id: string } }) {
  const orderId = atob(params.id);
  const queryClient = new QueryClient();
  const session: any = await auth();

  const customerAccessToken = session?.token?.access_token;

  if (!customerAccessToken) {
    return <div>Not logged in</div>;
  }
  const data = await queryClient.fetchQuery({
    queryKey: ['CUSTOMER_ORDER_QUERY'],
    queryFn: async () => {
      try {
        const response = await shopifyCustomerFetch<any>({
          customerToken: customerAccessToken,
          cache: 'no-store',
          query: CUSTOMER_ORDER_QUERY,
          tags: [TAGS.customer],
          variables: {
            orderId
          }
        });
        return response.body?.data;
      } catch (e: any) {
        console.log('error', e?.error);
      }
    }
  });

  const { order } = data;

  console.log("order?.lineItems", order?.lineItems);
  const flattenConnection = (connection: any) => connection?.nodes.map((edge: any) => edge);

  const lineItems = flattenConnection(order?.lineItems);
  const discountApplications = flattenConnection(order?.discountApplications);
  const fulfillmentStatus = flattenConnection(order?.fulfillments)?.[0]?.status;

  const firstDiscount = discountApplications[0]?.value;

  const discountValue = firstDiscount?.__typename === 'MoneyV2' && firstDiscount;

  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue' && firstDiscount?.percentage;

    const Money = ({ data }) => (
      <span>
        {data.amount} {data.currencyCode}
      </span>
    );

    function OrderLineRow({lineItem}) {
      return (
        <tr key={lineItem.id}>
          <td>
            <div>
              {lineItem?.image && (
                <div>
                  {/* <Image data={lineItem.image} width={96} height={96} /> */}
                </div>
              )}
              <div>
                <p>{lineItem.title}</p>
                <small>{lineItem.variantTitle}</small>
              </div>
            </div>
          </td>
          <td>
            <Money data={lineItem.price} />
          </td>
          <td>{lineItem.quantity}</td>
          <td>
            <Money data={lineItem.totalDiscount} />
          </td>
        </tr>
      );
    }

  return (
    <div className="account-order">
      <h2>Order {order.name}</h2>
      <p>Placed on {new Date(order.processedAt).toDateString()}</p>
      <br />
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((lineItem, lineItemIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <OrderLineRow key={lineItemIndex} lineItem={lineItem} />
            ))}
          </tbody>
          <tfoot>
            {((discountValue && discountValue.amount) || discountPercentage) && (
              <tr>
                <th scope="row" colSpan={3}>
                  <p>Discounts</p>
                </th>
                <th scope="row">
                  <p>Discounts</p>
                </th>
                <td>
                  {discountPercentage ? (
                    <span>-{discountPercentage}% OFF</span>
                  ) : (
                    discountValue && <Money data={discountValue} />
                  )}
                </td>
              </tr>
            )}
            <tr>
              <th scope="row" colSpan={3}>
                <p>Subtotal</p>
              </th>
              <th scope="row">
                <p>Subtotal</p>
              </th>
              <td>
                <Money data={order.subtotal} />
              </td>
            </tr>
            <tr>
              <th scope="row" colSpan={3}>
                Tax
              </th>
              <th scope="row">
                <p>Tax</p>
              </th>
              <td>
                <Money data={order.totalTax} />
              </td>
            </tr>
            <tr>
              <th scope="row" colSpan={3}>
                Total
              </th>
              <th scope="row">
                <p>Total</p>
              </th>
              <td>
                <Money data={order.totalPrice} />
              </td>
            </tr>
          </tfoot>
        </table>
        <div>
          <h3>Shipping Address</h3>
          {order?.shippingAddress ? (
            <address>
              <p>{order.shippingAddress.name}</p>
              {order.shippingAddress.formatted ? <p>{order.shippingAddress.formatted}</p> : ''}
              {order.shippingAddress.formattedArea ? (
                <p>{order.shippingAddress.formattedArea}</p>
              ) : (
                ''
              )}
            </address>
          ) : (
            <p>No shipping address defined</p>
          )}
          <h3>Status</h3>
          <div>
            <p>{fulfillmentStatus}</p>
          </div>
        </div>
      </div>
      <br />
      <p>
        <a target="_blank" href={order.statusPageUrl} rel="noreferrer">
          View Order Status →
        </a>
      </p>
    </div>
  );
}
