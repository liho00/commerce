// 'use client';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { TAGS } from 'lib/shopify/customer/constants';
import { shopifyCustomerFetch } from 'lib/shopify/customer/index';
import { CUSTOMER_DETAILS_QUERY } from 'lib/shopify/customer/queries/customer';
import { CustomerDetailsData } from 'lib/shopify/customer/types';
import { auth } from 'auth';
import { useSession } from 'next-auth/react';
// import { queryClient } from 'app/providers';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type OrderCardsProps = {
  orders: any;
};

export async function AccountOrdersHistory() {
  const queryClient = new QueryClient();

  // const { data: session }: any = useSession();
  const session: any = await auth();

  const customerAccessToken = session?.token?.access_token;

  console.log('customerAccessToken', customerAccessToken);
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
        console.log('response', response);
        return response.body?.data;
      } catch (e) {
        console.log('error customer fetch account', e);
      }
    }
    // enabled: !!customerAccessToken
  });

  const orders = data?.customer?.orders?.edges || [];
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mt-6">
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h2 className="text-lead font-bold">Order History</h2>
        {orders?.length ? <Orders orders={orders} /> : <EmptyOrders />}
      </div>
    </div>
    </HydrationBoundary>
  );
}

function EmptyOrders() {
  return (
    <div>
      <div className="mb-1">You haven&apos;t placed any orders yet.</div>
      <div className="w-48">
        <button
          className="mt-2 w-full text-sm"
          //variant="secondary"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
}

function Orders({ orders }: OrderCardsProps) {
  return (
    <ul className="false grid grid-flow-row grid-cols-1 gap-2 gap-y-6 sm:grid-cols-3 md:gap-4 lg:gap-6">
      {orders.map((order: any) => (
        <li key={order.node.id}>{order.node.number}</li>
      ))}
    </ul>
  );
}
