// 'use client';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { TAGS } from 'lib/shopify/customer/constants';
import { shopifyCustomerFetch } from 'lib/shopify/customer/index';
import { CUSTOMER_DETAILS_QUERY } from 'lib/shopify/customer/queries/customer';
import { CustomerDetailsData } from 'lib/shopify/customer/types';
import { auth } from 'auth';

// import { queryClient } from 'app/providers';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

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
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ul role="list" className="divide-y divide-gray-100">
        {orders.map((order) => (
          <li className="relative flex justify-between gap-x-6 py-5">
            {order.node.lineItems.edges.map((item: any) => (
              <>
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={item?.node?.image?.url}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <a href="#">
                        <span className="absolute inset-x-0 -top-px bottom-0"></span>#
                        {order.node.number}
                      </a>
                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                      <a
                        href="mailto:leslie.alexander@example.com"
                        className="relative truncate hover:underline"
                      >
                        <span key={item?.node?.id}>{item?.node?.title}</span>
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-4">
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {order?.node?.totalPrice?.currencyCode}{' '}
                      {(parseFloat(order?.node?.totalPrice?.amount) || 0)?.toFixed?.(2)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      <time dateTime="2023-01-23T13:23Z">
                        {dayjs(order?.node?.createdAt).format('MMMM D, YYYY')}
                      </time>
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 flex-none text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </>
            ))}
          </li>
        ))}
      </ul>
    </HydrationBoundary>
  );
}
