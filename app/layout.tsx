import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { ensureStartsWith } from 'lib/utils';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import Providers from './providers';
import Footer from 'components/layout/footer';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import './globals.css';
import Script from 'next/script';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cartId = cookies().get('cartId')?.value;
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart(cartId);

  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={GeistSans.variable}>
      <Script
        id="crip-script"
        dangerouslySetInnerHTML={{
          __html: `
          window.$crisp=[];window.CRISP_WEBSITE_ID="1fb30e0f-1462-4bd9-a948-d2b7dc8b8abf";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
        `
        }}
      ></Script>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <CartProvider cartPromise={cart}>
              <Navbar />
              <main className="mx-auto mt-4 max-w-screen-2xl space-y-4 px-4">
                {children}
                <Toaster closeButton />
              </main>
              <Footer />
            </CartProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
