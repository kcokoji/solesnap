"use client";

import { useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import CardPopUp from "@/app/components/CartPopUp";
import products from "@/app/libs/ProductsDB";
import Image from "next/image";

const Products = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-2 lg:max-w-7xl lg:px-8">
        <div className=" grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="relative">
              <div className="aspect-h-4 aspect-w-3 w-full  rounded-md bg-gray-200  md:group-hover:opacity-75 relative">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  width={500}
                  height={500}
                />
                <div className="absolute inset-0 flex items-end justify-end p-4">
                  <button
                    className="bg-white px-2 py-2 rounded-sm "
                    onClick={() => openModal(product)}
                  >
                    <ShoppingBagIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="text-sm md:text-md mt-1 font-medium text-gray-900">
                    <span className="text-sm"> ₦</span>
                    {product.price.toLocaleString()} NGN
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CardPopUp
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
