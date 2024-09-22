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
import Carouselss from './carousel';
import HomepageMenu from './homepage-menu';
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
        <div className="hidden w-full space-y-2 rounded-2xl bg-primary px-2 py-4 lg:col-span-2 lg:block">
          <h1 className="px-4 text-sm font-bold text-white">分类</h1>
          <div className="flex flex-col gap-2 text-xs">
            <Button variant="ghost" className="justify-start text-left text-white hover:text-black">
              <Star className="mr-2 h-4 w-4" /> 金纸 / 金箔 / 金银纸
            </Button>
            <Button variant="ghost" className="justify-start text-left text-white hover:text-black">
              <Star className="mr-2 h-4 w-4" />
              龙香 / 佛香 / 佛珠
            </Button>
            <Button variant="ghost" className="justify-start text-left text-white hover:text-black">
              <Star className="mr-2 h-4 w-4" />
              香品 / 香炉 / 香烛
            </Button>
            <Button variant="ghost" className="justify-start text-left text-white hover:text-black">
              <Star className="mr-2 h-4 w-4" />
              蜡烛 / 香炉 / 香烛
            </Button>
            <Button variant="ghost" className="justify-start text-left text-white hover:text-black">
              <Star className="mr-2 h-4 w-4" />
              套装 / 佛具 / 佛像
            </Button>
            <Button variant="ghost" className="justify-start text-left text-white hover:text-black">
              <Star className="mr-2 h-4 w-4" />
              套装 / 佛具 / 佛像
            </Button>
            <Button variant="ghost" className="justify-start text-left text-white hover:text-black">
              <Star className="mr-2 h-4 w-4" />
              套装 / 佛具 / 佛像
            </Button>
            <Button variant="ghost" className="justify-start text-left text-white hover:text-black">
              <Star className="mr-2 h-4 w-4" />
              套装 / 佛具 / 佛像
            </Button>
            <Button variant="ghost" className="justify-start text-left text-white hover:text-black">
              <Star className="mr-2 h-4 w-4" />
              套装 / 佛具 / 佛像
            </Button>
          </div>
        </div>

        <div className="grid w-full gap-4 lg:col-span-10 lg:grid-cols-5">
          <div className="grid gap-4 lg:col-span-4 lg:grid-cols-4 lg:grid-rows-7">
            <div className="flex w-full items-center justify-around overflow-auto rounded-2xl bg-gray-100 px-4 py-1 lg:col-span-4 lg:row-span-1">
              <HomepageMenu />
            </div>
            <div className="hidden grid-cols-1 gap-4 lg:col-span-4 lg:row-span-6 lg:grid lg:grid-cols-4">
              <div className="">
                <Carouselss />
              </div>

              <div className="grid w-full grid-rows-2 gap-4 lg:col-span-3 lg:grid-cols-3">
                <div className="rounded-2xl bg-gray-100 lg:col-span-2">
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

                {Array.from({ length: 4 }).map((_, i) => (
                  <div className="rounded-2xl bg-gray-100 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center truncate">
                        <h2 className="truncate font-bold">百亿补贴·买贵必赔</h2>
                        <span className="ml-2 whitespace-nowrap rounded bg-primary px-1 py-0.5 text-xs text-white">
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
                          className="mb-2 h-64 w-full rounded-lg bg-white object-contain lg:h-16"
                        />
                        <h3 className="mb-1 font-medium">中元节至尊配套</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-primary">限时8.4折</p>
                          <p className="font-bold text-primary">¥ 58.41</p>
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
            <Button className="w-full">立即登录</Button>
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
          <div className="font-medium text-primary">猜你喜欢</div>
          <div className="text-xs text-primary">精选好物推荐</div>
        </div>
      </div>
      <br />

      <Products />
    </>
  );
}
