import { auth } from 'auth';
import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import { Products } from 'components/grid/products';

import Footer from 'components/layout/footer';
import { AIChat } from 'components/ai-chat';
import { Button } from '@/components/ui/button';
export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};
import Carouselss from './carousel';
import { Calendar } from '@/components/ui/calendar';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text';
import { Star, ShoppingBag, Clock } from 'lucide-react';
export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="w-full space-y-2 rounded-2xl bg-primary px-2 py-4 lg:col-span-2">
          <h1 className="px-4 text-sm font-bold text-white">分类</h1>
          <div className="flex flex-col gap-2 text-xs">
            <Button
              variant="default"
              className="justify-start text-left hover:bg-white hover:text-black"
            >
              金纸 / 金箔 / 金银纸
            </Button>
            <Button
              variant="default"
              className="justify-start text-left hover:bg-white hover:text-black"
            >
              龙香 / 佛香 / 佛珠
            </Button>
            <Button
              variant="default"
              className="justify-start text-left hover:bg-white hover:text-black"
            >
              香品 / 香炉 / 香烛
            </Button>
            <Button
              variant="default"
              className="justify-start text-left hover:bg-white hover:text-black"
            >
              蜡烛 / 香炉 / 香烛
            </Button>
            <Button
              variant="default"
              className="justify-start text-left hover:bg-white hover:text-black"
            >
              套装 / 佛具 / 佛像
            </Button>
          </div>
        </div>

        <div className="grid w-full gap-4 lg:col-span-10 lg:grid-cols-5">
          <div className="grid gap-4 lg:col-span-4 lg:grid-cols-4 lg:grid-rows-7">
            <div className="flex w-full items-center justify-around rounded-2xl bg-gray-100 px-4 py-3 lg:col-span-4 lg:row-span-1">
              {[
                {
                  svg: <path d="M8 4h8v2H8V4zm0 4h8v2H8V8zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" />,
                  label: '金纸'
                },
                {
                  svg: (
                    <path d="M12 2c1.1 0 2 .9 2 2 0 .4-.1.7-.3 1L16 7.3V13h-2v2h-4v-2H8V7.3l2.3-2.3c-.2-.3-.3-.6-.3-1 0-1.1.9-2 2-2zm0 2c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z" />
                  ),
                  label: '龙香'
                },
                {
                  svg: (
                    <path d="M12 2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2z" />
                  ),
                  label: '香品'
                },
                {
                  svg: (
                    <path d="M12 2c-1.1 0-2 .9-2 2v3.17l-1.59-1.59L7 7l4 4 4-4-1.41-1.41L12 7.17V4c0-.55.45-1 1-1s1 .45 1 1v1h2V4c0-1.1-.9-2-2-2zm0 10c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2z" />
                  ),
                  label: '蜡烛'
                },
                {
                  svg: (
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
                  ),
                  label: '套装'
                },
                {
                  svg: (
                    <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14z" />
                  ),
                  label: '佛具'
                }
              ].map((icon, index) => (
                <div key={index} className="flex flex-row items-center justify-center space-x-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A2342]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F9E076"
                      className="h-4 w-4"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icon.svg}
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#0A2342]">{icon.label}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:col-span-4 lg:row-span-6 lg:grid-cols-4">
              <div className="">
                <Carouselss />
              </div>

              <div className="grid w-full grid-rows-2 gap-4 lg:col-span-3 lg:grid-cols-3">
                <div className="rounded-2xl bg-gray-100 lg:col-span-2">
                  <div className="flex flex-col items-start justify-start space-y-4 p-4 text-sm font-medium">
                    <div
                      className={cn(
                        'group rounded-full border border-black/5 bg-neutral-100 text-xs text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
                      )}
                    >
                      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                        <span>✨ AI 今日解析</span>
                        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                      </AnimatedShinyText>
                    </div>
                    <AIChat />
                  </div>
                </div>

                {Array.from({ length: 4 }).map((_, i) => (
                  <div className="rounded-2xl bg-gray-100 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center truncate">
                        <h2 className="truncate font-bold">百亿补贴·买贵必赔</h2>
                        <span className="ml-2 whitespace-nowrap rounded bg-red-500 px-1 py-0.5 text-xs text-white">
                          限时秒
                        </span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <img
                          src="https://cdn.shopify.com/s/files/1/0670/0839/7566/files/WhatsAppImage2024-09-10at13.54.52.jpg?v=1726737054"
                          alt="Libresse products"
                          className="mb-2 h-16 w-full rounded-lg bg-white object-contain"
                        />
                        <h3 className="mb-1 text-sm font-medium">中元节至尊配套</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-red-500">限时8.4折</p>
                          <p className="text-sm font-bold text-red-500">¥ 58.41</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-1 grid w-full rounded-2xl bg-gray-100 p-4 font-[cursive]">
            <div className="mb-4 flex items-center">
              <img
                src="/img/getAvatar.jpeg"
                alt="User avatar"
                className="mr-3 h-10 w-10 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold">晚上好，liho_lh</h2>
                <div className="text-sm text-gray-500">
                  <span className="mr-2">注册</span>
                  <span>开店</span>
                </div>
              </div>
            </div>
            <p className="mb-4 text-center font-bold">理想生活上易拜</p>
            <p className="mb-4 text-center text-sm text-gray-500">嘿！更懂你的推荐，更便捷的搜索</p>
            <Button className="w-full bg-red-500 text-white hover:bg-red-600">立即登录</Button>
            <div className="mt-4 flex justify-between">
              <button className="flex flex-col items-center">
                <Star className="h-6 w-6" />
                <span className="mt-1 text-xs">宝贝收藏</span>
              </button>
              <button className="flex flex-col items-center">
                <ShoppingBag className="h-6 w-6" />
                <span className="mt-1 text-xs">买过的店</span>
              </button>
              <button className="flex flex-col items-center">
                <Star className="h-6 w-6" />
                <span className="mt-1 text-xs">收藏的店</span>
              </button>
              <button className="flex flex-col items-center">
                <Clock className="h-6 w-6" />
                <span className="mt-1 text-xs">我的足迹</span>
              </button>
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
          <div className="font-medium text-red-500">猜你喜欢</div>
          <div className="text-xs text-red-500">精选好物推荐</div>
        </div>
      </div>
      <br />

      <Products />
    </>
  );
}
