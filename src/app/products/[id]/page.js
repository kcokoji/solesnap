"use client";

import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { ChevronRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import products from "@/app/libs/ProductsDB";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { ScaleLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";

const reviews = { average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ params: { id } }) {
  const product = products.find((product) => product.id === Number(id));

  // Add state for quantity
  const [quantity, setQuantity] = useState(1);

  // Add state for size and color selection
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [userId, setUserId] = useState(null);
  const [isCreatingCart, setIsCreatingCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getKindeSession = async () => {
      try {
        const res = await fetch("/api/kindeSession");
        const data = await res.json();

        if (data && data.user && data.user.id) {
          setUserId(data.user.id);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };

    getKindeSession();
  }, [userId]);

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select size and color");
      return;
    }

    let identifier = localStorage.getItem("cartId");

    if (!userId && !identifier) {
      // If there's no cartId in local storage, generate one with UUID
      identifier = uuidv4();
      localStorage.setItem("cartId", identifier);
    }

    setIsCreatingCart(true);

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId || identifier,
          productId: product.id,
          size: selectedSize,
          color: selectedColor,
        }),
      });

      if (response.ok) {
        // Handle success

        setSelectedSize();
        setSelectedColor();
        setQuantity(1);

        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            }  bg-white shadow-lg rounded-lg pointer-events-auto flex justify-between ring-1 ring-black ring-opacity-5`}
            style={{ maxWidth: "400px" }} // Adjust the maximum width as needed
          >
            <div className="p-4 flex items-center">
              <CheckCircleIcon className="w-5 h-5  mr-2" />
              <p className="text-sm font-medium text-black">
                Item added to Bag!
              </p>
            </div>
            <div className="border-l border-gray-200">
              <button
                onClick={() => router.push("/cart")}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ShoppingBagIcon className="h-5 w-5 text-black" />
              </button>
            </div>
          </div>
        ));
      } else if (response.status === 409) {
        toast.error("Item is already in cart");
      } else {
        toast.error("Failed to add item to cart");
      }
      setSelectedSize();
      setSelectedColor();
      setQuantity(1);
    } catch (error) {
      console.error("Error sending products to cart:", error);
      // Handle error
    } finally {
      setIsCreatingCart(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="pt-6 mx-auto lg:px-10">
        <nav
          className="text-sm font-medium text-gray-500 mx-auto py-5 pl-5 md:px-0"
          aria-label="Breadcrumb"
        >
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link
                className="text-gray-400 hover:text-gray-600 hover:border-b border-black"
                href="/"
              >
                Home
              </Link>
              <ChevronRightIcon className="w-6 h-6" />
              <Link
                className="text-gray-400 hover:text-gray-600 hover:border-b border-black"
                href="/products"
              >
                Products
              </Link>
              <ChevronRightIcon className="w-6 h-6" />
            </li>
            <li className="flex items-center">
              <span className="text-gray-700" aria-current="page">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row mx-auto lg:p-10">
          {/* Image gallery */}
          <div className="lg:aspect-h-5 lg:aspect-w-12 aspect-h-4 aspect-w-4 w-full rounded-md bg-gray-200 md:group-hover:opacity-75 relative  lg:px-48 h-1/2">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              width={500}
              height={500}
            />
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-8 pb-16 pt-10 lg:px-10 lg:max-w-4xl">
            <div className="lg:col-span-2  lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-xl md:text-2xl tracking-tight text-gray-900 my-2">
                <span className="text-md">₦</span>
                {product.price} NGN
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <p className="ml-3 text-sm font-medium text-amber-500">
                    {reviews.totalCount} reviews
                  </p>
                </div>
              </div>

              <div className="mt-10">
                {/* Colors */}

                <div className="mb-4  flex justify-between">
                  {/* Color Select */}
                  <label className="mr-2 flex items-center">Color:</label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="border px-9 py-2 "
                  >
                    <option value="">Select</option>
                    {product.color.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sizes */}
                <div className="mb-4">
                  <div className="mb-4 flex justify-between">
                    {/* Size Select */}
                    <label className="mr-2 text-md flex items-center">
                      Size:
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="border  px-9 py-2 text-center"
                    >
                      <option value="">Select</option>
                      {product.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label className="mr-2">Quantity:</label>
                    <div>
                      <button
                        className="border px-3"
                        onClick={() => setQuantity(quantity - 1)}
                        disabled={quantity === 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{quantity}</span>
                      <button
                        className="border px-3"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="px-10 bg-black text-white my-3 border w-full py-2 flex items-center justify-center"
                  onClick={handleAddToCart}
                  disabled={isCreatingCart}
                >
                  {isCreatingCart ? (
                    <div className="flex items-center">
                      <ScaleLoader
                        color="white"
                        speedMultiplier={3}
                        size="28px"
                        loading={true}
                        aria-label="Loading Spinner"
                      />
                    </div>
                  ) : (
                    <>
                      Add to Bag <ChevronRightIcon className="h-6 w-6" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Description
                </h3>

                <div className="space-y-6 mt-5">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-800">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
