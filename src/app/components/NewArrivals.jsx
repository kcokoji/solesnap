"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CardPopUp from "./CartPopUp";
import products from "../libs/ProductsDB";

export default function Example() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  const displayedProducts = products.slice(0, 6);

  return (
    <div className="bg-white">
      <div className="mx-auto hidden md:block px-4 py-16 sm:px-6 sm:py-24 max-w-7xl lg:px-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h2>
          <Link href="/" className="border-b border-black border-spacing-3 ">
            Explore All New Arrivals
          </Link>
        </div>
        <Swiper
          spaceBetween={18}
          slidesPerView={3.5}
          loop={true}
          navigation={true}
          className="my-7 "
        >
          {displayedProducts.map((product) => (
            <SwiperSlide key={product.id} className="group relative">
              <div className="aspect-h-4 aspect-w-3 w-full rounded-md bg-gray-200 md:group-hover:opacity-75 relative">
                <Link
                  href={`/products/${product.id}`}
                  className=" cursor-pointer"
                >
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    width={500}
                    height={500}
                  />
                </Link>
                <div className="absolute inset-0">
                  <div className="absolute bottom-0 right-0 p-4">
                    <button
                      className="bg-white px-2 py-2 rounded-sm"
                      onClick={() => openModal(product)}
                    >
                      <ShoppingBagIcon className="h-6 md:w-6" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="text-sm md:text-md mt-1 font-medium text-gray-900">
                    <span className="text-sm"> ₦</span>
                    {product.price.toLocaleString()} NGN
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <CardPopUp
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        product={selectedProduct}
      />
      {/* Mobile View */}
      <div className="mx-auto block md:hidden px-4 py-16 sm:px-6 sm:py-24 max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          New Arrivals
        </h2>
        <Swiper
          spaceBetween={18}
          slidesPerView={1.5}
          loop={true}
          navigation={true}
          className="my-7 "
        >
          {displayedProducts.map((product) => (
            <SwiperSlide key={product.id} className="group relative">
              <div className="aspect-h-4 aspect-w-3 w-full rounded-md bg-gray-200 md:group-hover:opacity-75 relative">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  width={500}
                  height={500}
                />
                <div className="absolute inset-0">
                  <div className="absolute bottom-0 right-0 p-4">
                    <button
                      className="bg-white px-2 py-2 rounded-sm"
                      onClick={() => openModal(product)}
                    >
                      <ShoppingBagIcon className="h-6 md:w-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="text-sm md:text-md mt-1 font-medium text-gray-900">
                    <span className="text-sm"> ₦</span>
                    {product.price} NGN
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link
          href="/products"
          className="border-b border-black border-spacing-3 "
        >
          Explore All New Arrivals
        </Link>
      </div>
      <CardPopUp
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        product={selectedProduct}
      />
    </div>
  );
}
