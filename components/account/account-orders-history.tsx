// 'use client';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { TAGS } from 'lib/shopify/customer/constants';
import { shopifyCustomerFetch } from 'lib/shopify/customer/index';
import { CUSTOMER_DETAILS_QUERY } from 'lib/shopify/customer/queries/customer';
import { CustomerDetailsData } from 'lib/shopify/customer/types';
import { auth } from 'auth';
import { Button } from '@/components/ui/button';

// import { queryClient } from 'app/providers';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

export async function AccountOrdersHistory() {
  const queryClient = new QueryClient();
  const session: any = await auth();

  const customerAccessToken = session?.token?.access_token;

  if (!customerAccessToken) {
    return <div>Not logged in</div>;
  }
  const data = await queryClient.fetchQuery({
    queryKey: ['CUSTOMER_DETAILS_QUERY'],
    queryFn: async () => {
      try {
        const response = await shopifyCustomerFetch<CustomerDetailsData>({
          customerToken: customerAccessToken,
          cache: 'no-store',
          query: CUSTOMER_DETAILS_QUERY,
          tags: [TAGS.customer]
        });
        return response.body?.data;
      } catch (e: any) {
        console.log('error', e?.error);
      }
    }
  });

  const orders = data?.customer?.orders?.edges || [];
  console.log(data);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div
        className="container mx-auto text-xs"
        style={
          {
            // zoom: 0.8
          }
        }
      >
        {orders.map((order, index) => (
          <div key={order.node.id} className="border-t py-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">Order number</div>
                <div>#{order.node.number}</div>
              </div>
              <div>
                <div className="font-semibold">Date placed</div>
                <div>{dayjs(order.node.processedAt).format('MMMM D, YYYY')}</div>
              </div>
              <div>
                <div className="font-semibold">Total amount</div>
                <div>
                  {/* ${order.node.totalPriceV2.amount.toFixed(2)} */}
                  {order?.node?.totalPrice?.currencyCode}{' '}
                  {(parseFloat(order?.node?.totalPrice?.amount) || 0)?.toFixed?.(2)}
                </div>
              </div>
              <div>
                {/* {JSON.stringify(order.node)} */}
                <a href={order?.node?.statusPageUrl} target="_blank">
                  <Button variant="outline" className="text-sm">
                    View Order
                  </Button>
                </a>
                {/* <Button variant="outline" className="text-sm">
                  View Invoice
                </Button> */}
              </div>
            </div>
            {order.node.lineItems.edges.map((item: any, index: any) => (
              <div key={index} className="flex border-t py-8">
                <img
                  src={item?.node?.image || '/img/empty.svg'}
                  alt={item.name}
                  className="mr-6 h-24 w-24 rounded-md bg-[#eee] object-contain"
                />
                <div className="flex-grow">
                  <div className="mb-2 flex justify-between">
                    <h3 className="text-sm font-semibold">{item.node.title}</h3>
                    <span className="font-semibold">${(0).toFixed(2)}</span>
                  </div>
                  <p className="mb-4 text-gray-600">{item.node.description}</p>
                  <div className="flex items-center justify-between">
                    {/* <div className="flex items-center">
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
                      <span className="text-xs text-gray-600">Delivered on July 12, 2021</span>
                    </div> */}
                    {/* <div>
                      <Button variant="link" className="mr-4 text-sm text-primary">
                        View product
                      </Button>
                      <Button variant="link" className="text-sm text-primary">
                        Buy again
                      </Button>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}

            <hr />
            <div className="pt-8">
              <p className="mb-4">Preparing to ship on March 24, 2021</p>
              <Progress value={33} className="h-2 bg-gray-200" />
              <div className="mt-2 flex justify-between text-xs">
                <span className="font-semibold text-primary">Order placed</span>
                <span>Processing</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </HydrationBoundary>
  );
}
