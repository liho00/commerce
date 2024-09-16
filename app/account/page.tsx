// 'use client'

import { auth } from 'auth';
import { TAGS } from 'lib/shopify/customer/constants';
import { shopifyCustomerFetch } from 'lib/shopify/customer/index';
import { CUSTOMER_DETAILS_QUERY } from 'lib/shopify/customer/queries/customer';
import { CustomerDetailsData } from 'lib/shopify/customer/types';
import { AccountOrdersHistory } from 'components/account/account-orders-history';
import { AccountProfile } from 'components/account/account-profile';

export const runtime = 'edge';
export default async function AccountPage() {
  const session: any = await auth();

  if (!session) {
    return <div>Not logged in</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full">
            {/* <div> Welcome: {customerData?.emailAddress?.emailAddress}</div> */}
          </div>
          <div className="h-full w-full">
            <div className="mt-5">
              <AccountProfile />
            </div>
          </div>
          <div className="h-full w-full">
            <div className="mt-5">
              <AccountOrdersHistory />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
