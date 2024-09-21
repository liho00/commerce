'use client';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        pagination={true}
        autoplay={{
          delay: 3000
        }}
        modules={[Pagination, Autoplay]}
        className="h-64 lg:h-full rounded-2xl bg-gray-100"
        style={{
          '--swiper-pagination-color': '#fff'
        }}
      >
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://img.alicdn.com/imgextra/i4/O1CN019hL4L725PkzzZ71Pd_!!6000000007519-0-tps-480-672.jpg)'
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://img.alicdn.com/imgextra/i2/O1CN01kcwuQk1LzVafnz3rv_!!6000000001370-0-tps-480-672.jpg)'
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://img.alicdn.com/imgextra/i2/O1CN01g1llb423jKh4F5p5M_!!6000000007291-0-tps-480-672.jpg)'
            }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
