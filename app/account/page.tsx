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
import { Checkbox } from '@/components/ui/checkbox';

// export const runtime = 'edge';
export default async function AccountPage() {
  const session: any = await auth();

  if (!session) {
    return <div>Not logged in</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-screen-sm">
        <Tabs defaultValue="orders" className="">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
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
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" />
                </div>
              </CardContent>
              <CardFooter className="space-x-2">
                <Button>Save changes</Button>
              </CardFooter>
              <hr />
              <CardHeader>
                <CardTitle>Sign Out</CardTitle>
                <CardDescription>
                  End your current session and return to the login page.
                </CardDescription>
              </CardHeader>
              <CardFooter className="space-x-2">
                <SignOut />
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Create address</CardTitle>
                <CardDescription>
                  Add a new address to your account. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="addressLine1">Address line 1</Label>
                  <Input id="addressLine1" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="addressLine2">Address line 2</Label>
                  <Input id="addressLine2" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postalCode">Zip / Postal Code</Label>
                  <Input id="postalCode" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="country">Country Code</Label>
                  <Input id="country" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="default" />
                  <label
                    htmlFor="default"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Set as default address
                  </label>
                </div>
              </CardContent>
              <CardFooter className="space-x-2">
                <Button>Save changes</Button>
              </CardFooter>

              <hr />
              <CardHeader>
                <CardTitle>Existing addresses</CardTitle>
                <CardDescription>
                  View and manage your existing addresses. Click on an address to edit it.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="addressLine1">Address line 1</Label>
                  <Input id="addressLine1" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="addressLine2">Address line 2</Label>
                  <Input id="addressLine2" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postalCode">Zip / Postal Code</Label>
                  <Input id="postalCode" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="country">Country Code</Label>
                  <Input id="country" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="default" />
                  <label
                    htmlFor="default"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Set as default address
                  </label>
                </div>
              </CardContent>
              <CardFooter className="space-x-2">
                <Button>Save changes</Button>
                <Button variant="destructive">Delete address</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
