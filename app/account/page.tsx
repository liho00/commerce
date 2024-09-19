// 'use client'

import { auth } from 'auth';
import { TAGS } from 'lib/shopify/customer/constants';
import { shopifyCustomerFetch } from 'lib/shopify/customer/index';
import { CUSTOMER_DETAILS_QUERY } from 'lib/shopify/customer/queries/customer';
import { CustomerDetailsData } from 'lib/shopify/customer/types';
import { AccountOrdersHistory } from 'components/account/account-orders-history';
import { AccountProfile, SignOut } from 'components/account/account-profile';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const runtime = 'edge';
export default async function AccountPage() {
  const session: any = await auth();

  if (!session) {
    return <div>Not logged in</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-screen-sm p-4">
        <Tabs defaultValue="orders" className="">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order history </CardTitle>
                <CardDescription>
                  View your order history here. Click on an order to view more details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <AccountOrdersHistory />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter className="space-x-2">
                <Button>Save changes</Button>
              </CardFooter>
              <hr />
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardFooter className="space-x-2">
                <SignOut />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
