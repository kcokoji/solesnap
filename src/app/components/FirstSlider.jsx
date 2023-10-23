"use client";

import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/img/product8.jpg",
    text: "New In",
    text2: "Shop Now",
  },
  {
    id: 2,
    image: "/img/product9.jpg",
    text: "Women Shoes",
    text2: "Buy Now",
  },
  {
    id: 3,
    image: "/img/product10.jpg",
    text: "Nike Shoes",
    text2: "Shop Now",
  },
  // Add more slides as needed
];
const slidesLg = [
  {
    id: 1,
    image: "/img/product9Lg.jpg",
    text: "New In",
    text2: "Shop Now",
  },
  {
    id: 2,
    image: "/img/product9Lg.jpg",
    text: "Women Shoes",
    text2: "Buy Now",
  },
  {
    id: 3,
    image: "/img/product9Lg.jpg",
    text: "Nike Shoes",
    text2: "Shop Now",
  },
  // Add more slides as needed
];

const App = () => {
  return (
    <>
      <div className=" flex items-center justify-center lg:hidden bg-gray-200 ">
        <Swiper
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="relative bg-gray-200">
              <Image
                src={slide.image}
                alt={`Slide ${slide.id}`}
                width={1000}
                height={1000}
                priority={true}
                className="max-h-[150vh]"
              />
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2  pl-10 lg:20">
                <p className="text-4xl font-extrabold  text-black mb-5">
                  {slide.text}
                </p>
                <Link
                  href="/products"
                  className="border-b-2 text-black border-black  text-2xl "
                >
                  {slide.text2}
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="  items-center justify-center  hidden lg:flex bg-gray-200 ">
        <Swiper
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
        >
          {slidesLg.map((slide) => (
            <SwiperSlide key={slide.id} className="relative ">
              <Image
                src={slide.image}
                alt={`Slide ${slide.id}`}
                width={2000}
                height={3000}
                priority={true}
                className="max-h-[100vh]"
              />
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2  pl-10 lg:20">
                <p className=" text-5xl font-extrabold  text-black mb-5">
                  {slide.text}
                </p>
                <Link
                  href="/products"
                  className="border-b-2 text-black border-black text-2xl "
                >
                  {slide.text2}
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default App;
