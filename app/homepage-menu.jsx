'use client';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function App() {
  const [swiper, setSwiper] = useState(null);
  return (
    <>
      <div className="flex flex-grow flex-col space-y-2 overflow-hidden">
        <div className="flex w-full flex-shrink-0 justify-start gap-3 overflow-hidden bg-transparent">
          <Button
            variant="ghost"
            className="flex-shrink-0 h-auto py-2"
            size="icon"
            onClick={() => {
              swiper.slidePrev();
            }}
          >
            <svg
              className="h-3 w-3"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29284 5.07366L5.59265 8.37353L4.64984 9.31633L0.407171 5.07366L4.64984 0.831055L5.59265 1.77386L2.29284 5.07366Z"
                fill="currentColor"
              />
            </svg>
          </Button>
          <Swiper onSwiper={setSwiper} spaceBetween={10} slidesPerView={'auto'}>
            {[
              {
                svg: <path d="M8 4h8v2H8V4zm0 4h8v2H8V8zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" />,
                label: '龙香'
              },
              {
                svg: (
                  <path d="M12 2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2z" />
                ),
                label: '福贡'
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
              },
              {
                svg: <path d="M8 4h8v2H8V4zm0 4h8v2H8V8zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" />,
                label: '金纸'
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
              },
              {
                svg: <path d="M8 4h8v2H8V4zm0 4h8v2H8V8zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" />,
                label: '金纸'
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
            ]?.map((provider, index) => (
              <SwiperSlide className="!w-auto">
                <Button variant="ghost" key={provider?.id}>
                  {provider?.label}
                </Button>
              </SwiperSlide>
            ))}
          </Swiper>
          <Button
            variant="ghost"
            className="flex-shrink-0 h-auto py-2"
            size="icon"
            onClick={() => {
              swiper.slideNext();
            }}
          >
            <svg
              className="h-3 w-3"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.70704 5.0738L0.407227 1.77393L1.35003 0.831134L5.59271 5.0738L1.35003 9.31641L0.407227 8.3736L3.70704 5.0738Z"
                fill="currentColor"
              />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
}
