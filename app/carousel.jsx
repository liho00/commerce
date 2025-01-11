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
        loop
        modules={[Pagination, Autoplay]}
        className="h-64 rounded-2xl bg-gray-100 lg:h-full"
        style={{
          '--swiper-pagination-color': '#fff'
        }}
      >
        {[
          'https://cdn.shopify.com/s/files/1/0670/0839/7566/files/1_621e6d7c-6203-4614-b332-29d26145bdb3.png?v=1736583656',
          'https://cdn.shopify.com/s/files/1/0670/0839/7566/files/2_27a2b049-4716-4d0e-a8b0-1b9467e9a8db.png?v=1736584070',
          'https://cdn.shopify.com/s/files/1/0670/0839/7566/files/3_1351061a-47ce-4c75-af8d-f94eac43bb77.png?v=1736584146'
          // 'https://img.alicdn.com/imgextra/i4/O1CN019hL4L725PkzzZ71Pd_!!6000000007519-0-tps-480-672.jpg',
          // 'https://img.alicdn.com/imgextra/i2/O1CN01kcwuQk1LzVafnz3rv_!!6000000001370-0-tps-480-672.jpg',
          // 'https://img.alicdn.com/imgextra/i2/O1CN01g1llb423jKh4F5p5M_!!6000000007291-0-tps-480-672.jpg'
        ].map((url, index) => (
          <SwiperSlide key={index}>
            <a href="#">
              <div
                className="h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${url})`
                }}
              ></div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
