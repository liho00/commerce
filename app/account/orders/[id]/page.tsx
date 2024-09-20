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
import { Button } from '@/components/ui/button';

import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

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

  // console.log('order?.lineItems', order?.lineItems);
  // const flattenConnection = (connection: any) => connection?.nodes.map((edge: any) => edge);

  // const lineItems = flattenConnection(order?.lineItems);
  // const discountApplications = flattenConnection(order?.discountApplications);
  // const fulfillmentStatus = flattenConnection(order?.fulfillments)?.[0]?.status;

  // const firstDiscount = discountApplications[0]?.value;

  // const discountValue = firstDiscount?.__typename === 'MoneyV2' && firstDiscount;

  // const discountPercentage =
  //   firstDiscount?.__typename === 'PricingPercentageValue' && firstDiscount?.percentage;

  // const Money = ({ data }) => (
  //   <span>
  //     {data.amount} {data.currencyCode}
  //   </span>
  // );

  // function OrderLineRow({ lineItem }) {
  //   return (
  //     <tr key={lineItem.id}>
  //       <td>
  //         <div>
  //           {lineItem?.image && (
  //             <div>{/* <Image data={lineItem.image} width={96} height={96} /> */}</div>
  //           )}
  //           <div>
  //             <p>{lineItem.title}</p>
  //             <small>{lineItem.variantTitle}</small>
  //           </div>
  //         </div>
  //       </td>
  //       <td>
  //         <Money data={lineItem.price} />
  //       </td>
  //       <td>{lineItem.quantity}</td>
  //       <td>
  //         <Money data={lineItem.totalDiscount} />
  //       </td>
  //     </tr>
  //   );
  // }

  return (
    <>
      <div className="mx-auto max-w-4xl space-y-8 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Order {order.name}</h1>
          <a
            href={`https://0e70ea-3.myshopify.com/67008397566/orders/a9cb0a696f270b7a59a53a72b4dacbb0/authenticate?key=1578ccd6ffffb9c2ec1e1d5e2eaebdf4`}
            className="text-primary hover:underline"
          >
            View Order Status →
          </a>
        </div>

        <div className="space-y-6 rounded-lg bg-white p-6 shadow">
          <div className="flex space-x-4">
            <img
              src={order?.node?.image || '/img/empty.svg'}
              alt={order.name}
              className="mr-6 h-24 w-24 rounded-md bg-[#eee] object-contain"
            />
            {/* <Image
              src="/placeholder.svg"
              alt="Nomad Tumbler"
              width={100}
              height={100}
              className="rounded-lg"
            /> */}
            <div>
              <h2 className="font-semibold">Nomad Tumbler</h2>
              <p className="text-gray-600">$35.00</p>
              <p className="mt-2 text-sm text-gray-500">
                This durable and portable insulated tumbler will keep your beverage at the perfect
                temperature during your next adventure.
              </p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <h3 className="font-semibold">Delivery address</h3>
              <p>Floyd Miles</p>
              <p>7363 Cynthia Pass</p>
              <p>Toronto, ON N3Y 4H8</p>
            </div>
            <div>
              <h3 className="font-semibold">Shipping updates</h3>
              <p>f••••@example.com</p>
              <p>1•••••••40</p>
              <a href="#" className="text-primary hover:underline">
                Edit
              </a>
            </div>
          </div>
          <div>
            <p className="mb-2">Preparing to ship on March 24, 2021</p>
            <Progress value={33} className="h-2 bg-gray-200" />
            <div className="mt-2 flex justify-between text-sm">
              <span className="font-semibold text-primary">Order placed</span>
              <span>Processing</span>
              <span>Shipped</span>
              <span>Delivered</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-lg bg-white p-6 shadow">
          <div className="flex space-x-4">
            <Image
              src="/placeholder.svg"
              alt="Minimalist Wristwatch"
              width={100}
              height={100}
              className="rounded-lg"
            />
            <div>
              <h2 className="font-semibold">Minimalist Wristwatch</h2>
              <p className="text-gray-600">$149.00</p>
              <p className="mt-2 text-sm text-gray-500">
                This contemporary wristwatch has a clean, minimalist look and high quality
                components.
              </p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <h3 className="font-semibold">Delivery address</h3>
              <p>Floyd Miles</p>
              <p>7363 Cynthia Pass</p>
              <p>Toronto, ON N3Y 4H8</p>
            </div>
            <div>
              <h3 className="font-semibold">Shipping updates</h3>
              <p>f••••@example.com</p>
              <p>1•••••••40</p>
              <a href="#" className="text-primary hover:underline">
                Edit
              </a>
            </div>
          </div>
          <div>
            <p className="mb-2">Shipped on March 23, 2021</p>
            <Progress value={66} className="h-2 bg-gray-200" />
            <div className="mt-2 flex justify-between text-sm">
              <span>Order placed</span>
              <span>Processing</span>
              <span className="font-semibold text-primary">Shipped</span>
              <span>Delivered</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg bg-gray-50 p-6">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">Billing address</h3>
              <p className="text-sm text-gray-600">Floyd Miles</p>
              <p className="text-sm text-gray-600">7363 Cynthia Pass</p>
              <p className="text-sm text-gray-600">Toronto, ON N3Y 4H8</p>
            </div>
            <div>
              <h3 className="font-semibold">Payment information</h3>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-8 rounded bg-primary"></div>
                <p className="text-sm text-gray-600">Ending with 4242</p>
              </div>
              <p className="text-sm text-gray-600">Expires 02 / 24</p>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$72.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$6.16</span>
            </div>
            <div className="mt-2 flex justify-between text-lg font-semibold">
              <span>Order total</span>
              <span className="text-primary">$83.16</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto" style={{}}>
        <div key={order.id} className="mb-12 border-t pt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">Order number</div>
              <div>{order.name}</div>
            </div>
            <div>
              <div className="font-semibold">Date placed</div>
              <div>{dayjs(order.processedAt).format('MMMM D, YYYY')}</div>
            </div>
            <div>
              <div className="font-semibold">Total amount</div>
              <div>
                {/* ${order.totalPriceV2.amount.toFixed(2)} */}
                {order?.node?.totalPrice?.currencyCode}{' '}
                {(parseFloat(order?.node?.totalPrice?.amount) || 0)?.toFixed?.(2)}
              </div>
            </div>
            <div>
              <Button variant="outline" className="mr-2">
                View Order
              </Button>
              {/* <Button variant="outline">View Invoice</Button> */}
            </div>
          </div>
          {order.lineItems.nodes.map((item: any, index: any) => (
            <div key={index} className="flex border-t py-8">
              <img
                src={item?.image?.url}
                alt={item.name}
                className="mr-6 h-24 w-24 rounded-md bg-[#eee] object-contain"
              />
              <div className="flex-grow">
                <div className="mb-2 flex justify-between">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <span className="font-semibold">${(0).toFixed(2)}</span>
                </div>
                <p className="mb-4 text-gray-600">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">Delivered on July 12, 2021</span>
                  </div>
                  <div>
                    <Button variant="link" className="mr-4 text-primary">
                      View product
                    </Button>
                    <Button variant="link" className="text-primary">
                      Buy again
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="account-order">
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
              {lineItems.map((lineItem, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <OrderLineRow key={index} lineItem={lineItem} />
              ))}
            </tbody>
            <tfoot>
              {((discountValue && discountValue.amount) || discountPercentage) && (
                <tr>
                  <th scope="row" colSpan={3}>
                    Discounts
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
                  Subtotal
                </th>
                <td>
                  <Money data={order.subtotal} />
                </td>
              </tr>
              <tr>
                <th scope="row" colSpan={3}>
                  Tax
                </th>
                <td>
                  <Money data={order.totalTax} />
                </td>
              </tr>
              <tr>
                <th scope="row" colSpan={3}>
                  Total
                </th>
                <td>
                  <Money data={order.totalPrice} />
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="shipping-details">
            <h3>Shipping Address</h3>
            {order?.shippingAddress ? (
              <address>
                <p>{order.shippingAddress.name}</p>
                {order.shippingAddress.formatted && <p>{order.shippingAddress.formatted}</p>}
                {order.shippingAddress.formattedArea && (
                  <p>{order.shippingAddress.formattedArea}</p>
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
      </div> */}
    </>
  );
}
