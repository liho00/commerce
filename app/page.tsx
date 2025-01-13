import { auth } from 'auth';
import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import { Products } from 'components/grid/products';

import Footer from 'components/layout/footer';
import { AIChat } from 'components/ai-chat';
import { Button } from '@/components/ui/button';
export const metadata = {
  description: 'ePray - 易拜',
  openGraph: {
    type: 'website'
  }
};
import Carousels from './carousel';
import HomepageMenu from './homepage-menu';
import { Calendar } from '@/components/ui/calendar';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text';
import { Star, ShoppingBag, Clock } from 'lucide-react';
import Form from 'next/form';
import { signIn, signOut } from 'auth/index';
import { getProducts } from 'lib/shopify';
import Link from 'next/link';

export default async function HomePage() {
  const session = await auth();
  const products = await getProducts({});

  return (
    <>
      {/* <div className="flex h-14 w-full items-center justify-around overflow-auto rounded-2xl bg-gray-100 px-4 py-1 lg:col-span-4 lg:row-span-1">
        <HomepageMenu products={products} />
      </div> */}
      <div className="grid gap-4 overflow-hidden lg:grid-cols-12">
        <div className="hidden w-full space-y-2 rounded-2xl bg-primary px-2 py-4 lg:col-span-2 lg:block">
          <h1 className="px-4 text-sm font-bold text-white">分类</h1>
          <div className="flex flex-col gap-2 text-xs">
            {products.slice(0, 10).map((product) => (
              <Link href={`/product/${product.handle}`} className="flex w-full">
                <Button
                  variant="ghost"
                  className="justify-start text-left text-white hover:text-black w-full"
                >
                  <Star className="mr-2 h-4 w-4" /> {product.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid w-full gap-4 lg:col-span-10 lg:grid-cols-5">
          <div className="grid gap-4 lg:col-span-4 lg:grid-cols-4 lg:grid-rows-7">
            <div className="flex h-full w-full items-center justify-around overflow-auto rounded-2xl bg-gray-100 px-4 py-1 lg:col-span-4 lg:row-span-1">
              <HomepageMenu products={products} />
            </div>
            <div className="hidden grid-cols-1 gap-4 lg:col-span-4 lg:row-span-7 lg:grid lg:grid-cols-4">
              <div className="">
                <Carousels products={products} />
              </div>

              <div className="grid w-full grid-rows-1 gap-4 lg:col-span-3 lg:grid-cols-3">
                {/* <div className="rounded-2xl bg-gray-100 lg:col-span-3">
                  <div className="flex flex-col items-start justify-start space-y-4 p-4 text-sm font-medium">
                    <a
                      className={cn(
                        'group rounded-full border border-black/5 bg-neutral-100 text-xs text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
                      )}
                      href="https://www.6ren.co/"
                      target="_blank"
                    >
                      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                        <span>✨ AI 今日解析</span>
                        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                      </AnimatedShinyText>
                    </a>
                    <AIChat />
                  </div>
                </div> */}

                {products.slice(0, 3).map((product) => (
                  <Link
                    className="relative flex h-full w-full flex-grow flex-col rounded-2xl bg-gray-100 p-4"
                    href={`/product/${product.handle}`}
                    prefetch={true}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center truncate">
                        <h2 className="truncate font-bold">买贵必赔</h2>
                        <span className="ml-2 whitespace-nowrap rounded bg-primary px-1 py-0.5 text-xs text-white">
                          限时秒
                        </span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex flex-grow flex-col">
                      <img
                        src={product.featuredImage.url}
                        alt="Libresse products"
                        className="mb-2 h-full w-full rounded-lg bg-gray-100 object-contain"
                      />
                      <h3 className="font-medium">{product.title}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-primary">限时8.4折</p>
                        <p className="font-bold text-primary">
                          {product.priceRange.maxVariantPrice.currencyCode}{' '}
                          {product.priceRange.maxVariantPrice.amount}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-1 grid w-full grid-rows-2 gap-4 rounded-2xl font-[cursive]">
            <div className="rounded-2xl bg-gray-100 p-4">
              <div className="mb-4 flex items-center">
                <img
                  src="/img/getAvatar.jpeg"
                  alt="User avatar"
                  className="mr-3 h-10 w-10 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    您好，{session ? session?.user?.name : '游客'}
                  </h2>
                  <div className="text-sm text-gray-500">
                    <a
                      href={`https://shopify.com/${process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID}/account`}
                      className=""
                    >
                      注册
                    </a>
                  </div>
                </div>
              </div>
              {/* <p className="mb-4 text-center font-bold">理想生活上易拜</p>
            <p className="mb-4 text-center text-xs text-gray-500">嘿！更懂你的推荐，更便捷的搜索</p> */}
              {!session ? (
                <Form
                  action={async () => {
                    'use server';
                    await signIn('shopify');
                  }}
                >
                  <Button className="w-full">立即登录</Button>
                </Form>
              ) : (
                <Button className="w-full" asChild>
                  <a
                    href={`https://shopify.com/${process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID}/account`}
                  >
                    我的账户
                  </a>
                </Button>
              )}
              <div className="mt-4 grid grid-cols-4">
                <a
                  href={`https://shopify.com/${process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID}/account/orders`}
                  className="flex flex-col items-center rounded-xl p-1 transition hover:bg-gray-200"
                >
                  <Star className="h-6 w-6" />
                  <span className="mt-1 text-xs">订单</span>
                </a>
                <a
                  href={`https://shopify.com/${process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID}/account/profile`}
                  className="flex flex-col items-center rounded-xl p-1 transition hover:bg-gray-200"
                >
                  <ShoppingBag className="h-6 w-6" />
                  <span className="mt-1 text-xs">资料</span>
                </a>

                <button className="flex flex-col items-center rounded-xl p-1 transition hover:bg-gray-200">
                  <Star className="h-6 w-6" />
                  <span className="mt-1 text-xs">购物车</span>
                </button>
                <a
                  href={`https://shopify.com/${process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID}/account/settings`}
                  className="flex cursor-pointer flex-col items-center rounded-xl p-1 transition hover:bg-gray-200"
                >
                  <Clock className="h-6 w-6" />
                  <span className="mt-1 text-xs">设置</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-100">
              <div className="flex flex-col items-start justify-start space-y-4 p-4 text-sm font-medium">
                <a
                  className={cn(
                    'group rounded-full border border-black/5 bg-neutral-100 text-xs text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
                  )}
                  href="https://www.6ren.co/"
                  target="_blank"
                >
                  <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                    <span>✨ AI 今日解析</span>
                    <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedShinyText>
                </a>
                <AIChat />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="flex items-center space-x-2">
        <img
          className="w-12 rounded-full object-contain"
          style={{
            backgroundColor: 'rgba(255, 0, 54, 0.082)'
          }}
          src="https://gw.alicdn.com/imgextra/i2/O1CN011E0R1J23w9lJDeJXk_!!6000000007319-2-tps-192-192.png"
        ></img>
        <div>
          <div className="font-medium text-primary">猜你喜欢</div>
          <div className="text-xs text-primary">精选好物推荐</div>
        </div>
      </div>
      <br />

      <Products />
    </>
  );
}
