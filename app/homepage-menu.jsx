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
import Link from 'next/link';

export default function App({ products }) {
  const [swiper, setSwiper] = useState(null);

  return (
    <>
      <div className="flex flex-grow flex-col space-y-2 overflow-hidden">
        <div className="flex w-full flex-shrink-0 justify-start gap-3 overflow-hidden bg-transparent">
          <Button
            variant="ghost"
            className="h-auto flex-shrink-0 py-2"
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
            {products
              .map((product, index) => ({
                svg: <path d="M8 4h8v2H8V4zm0 4h8v2H8V8zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" />,
                label: product?.title
              }))
              ?.map((provider, index) => (
                <SwiperSlide className="!w-auto">
                  <Link href={`/product/${products[index].handle}`} className="">
                    <Button variant="ghost" key={provider?.id}>
                      {provider?.label}
                    </Button>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
          <Button
            variant="ghost"
            className="h-auto flex-shrink-0 py-2"
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
