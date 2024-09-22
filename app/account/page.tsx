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
import { getTranslations } from 'next-intl/server';

// export const runtime = 'edge';
export default async function AccountPage() {
  const session: any = await auth();
  const t = await getTranslations();

  if (!session) {
    return <div>{t('page.VruPdDPkMVhpEvgfqr4mL')}</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-screen-sm">
        <Tabs defaultValue="orders" className="">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">{t('page.rDz9kAgA3s72C0FbDbhLU')}</TabsTrigger>
            <TabsTrigger value="addresses">{t('page.0R8Or9ENKObFE-cawJThW')}</TabsTrigger>
            <TabsTrigger value="account">{t('page.7hMsD4NOmXpaMrqwitQzl')}</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>{t('page.TRIUL__9Ub1-pSYi7P7xJ')} </CardTitle>
                <CardDescription>{t('page.07zRrSRMfxKx1Y76QoXgi')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <AccountOrdersHistory />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>{t('page.ks_zwZ-yCkBobRY26_dmk')}</CardTitle>
                <CardDescription>{t('page.Nwyzhzx_e-DY2Dx0weQTl')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="firstName">{t('page.Y3AgoIWoEpnXkYo57sNPr')}</Label>
                  <Input id="firstName" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">{t('page.cw8H0JMTZcWmB8afRzfSn')}</Label>
                  <Input id="lastName" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="company">{t('page.bjFVQt9jpURVTEoaTHApZ')}</Label>
                  <Input id="company" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="addressLine1">{t('page.10amclfW5o3wXh-jd7eaZ')}</Label>
                  <Input id="addressLine1" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="addressLine2">{t('page.PufZxbg49Wph66X6U2D_6')}</Label>
                  <Input id="addressLine2" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">{t('page.-bvTRVPEqtsmHq-nrI1jU')}</Label>
                  <Input id="city" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="state">{t('page.d1fIGno-WmycV99yaQ5pW')}</Label>
                  <Input id="state" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postalCode">{t('page.OGxXmJ_nOzBYTSTORfw2o')}</Label>
                  <Input id="postalCode" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="country">{t('page.kQvSRHZd_2i51NmKWzMPK')}</Label>
                  <Input id="country" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">{t('page.ngcuO9tgrDznpb908Zexg')}</Label>
                  <Input id="phone" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="default" />
                  <label
                    htmlFor="default"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t('page.ukiRSqhzDaZyf7qxWzyFy')}
                  </label>
                </div>
              </CardContent>
              <CardFooter className="space-x-2">
                <Button>{t('page.dcqQLrOss-mygZCqcTgJP')}</Button>
              </CardFooter>

              <hr />
              <CardHeader>
                <CardTitle>{t('page.Xyb6OY1e6UTBUtBb7DjK_')}</CardTitle>
                <CardDescription>{t('page.MUAwoe-l9kBp0DmKUm6sM')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="firstName">{t('page.Y3AgoIWoEpnXkYo57sNPr')}</Label>
                  <Input id="firstName" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">{t('page.cw8H0JMTZcWmB8afRzfSn')}</Label>
                  <Input id="lastName" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="company">{t('page.bjFVQt9jpURVTEoaTHApZ')}</Label>
                  <Input id="company" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="addressLine1">{t('page.10amclfW5o3wXh-jd7eaZ')}</Label>
                  <Input id="addressLine1" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="addressLine2">{t('page.PufZxbg49Wph66X6U2D_6')}</Label>
                  <Input id="addressLine2" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">{t('page.-bvTRVPEqtsmHq-nrI1jU')}</Label>
                  <Input id="city" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="state">{t('page.d1fIGno-WmycV99yaQ5pW')}</Label>
                  <Input id="state" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postalCode">{t('page.OGxXmJ_nOzBYTSTORfw2o')}</Label>
                  <Input id="postalCode" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="country">{t('page.kQvSRHZd_2i51NmKWzMPK')}</Label>
                  <Input id="country" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">{t('page.ngcuO9tgrDznpb908Zexg')}</Label>
                  <Input id="phone" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="default" />
                  <label
                    htmlFor="default"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t('page.ukiRSqhzDaZyf7qxWzyFy')}
                  </label>
                </div>
              </CardContent>
              <CardFooter className="space-x-2">
                <Button>{t('page.dcqQLrOss-mygZCqcTgJP')}</Button>
                <Button variant="destructive">{t('page.rceZWplnrMKPyWIYpj0S-')}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>{t('page.7hMsD4NOmXpaMrqwitQzl')}</CardTitle>
                <CardDescription>{t('page.wk69sr8YUvX6_bqp6Q5OC')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="firstName">{t('page.Y3AgoIWoEpnXkYo57sNPr')}</Label>
                  <Input id="firstName" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">{t('page.cw8H0JMTZcWmB8afRzfSn')}</Label>
                  <Input id="lastName" />
                </div>
              </CardContent>
              <CardFooter className="space-x-2">
                <Button>{t('page.dcqQLrOss-mygZCqcTgJP')}</Button>
              </CardFooter>
              <hr />
              <CardHeader>
                <CardTitle>{t('page.UUMtiFpi_xKDsWeQbuuCv')}</CardTitle>
                <CardDescription>{t('page.mEzEJDZoJcwilw4VsNJQk')}</CardDescription>
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
