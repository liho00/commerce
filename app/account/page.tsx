// 'use client'

import { auth } from 'auth';
import { TAGS } from 'lib/shopify/customer/constants';
import { shopifyCustomerFetch } from 'lib/shopify/customer/index';
import { CUSTOMER_DETAILS_QUERY } from 'lib/shopify/customer/queries/customer';
import { CustomerDetailsData } from 'lib/shopify/customer/types';
import { AccountOrdersHistory } from 'components/account/account-orders-history';
import { AccountProfile } from 'components/account/account-profile';
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
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
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
