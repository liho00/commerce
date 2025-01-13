'use client';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';

export default function App({ products }) {
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
        {products.slice(0, 3).map((product, index) => (
          <SwiperSlide key={index}>
            <Link href={`/product/${product.handle}`} className="">
              <img
                src={product.featuredImage.url}
                className="h-full w-full object-cover"
                style={
                  {
                    // aspectRatio: '139/502'
                  }
                }
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
