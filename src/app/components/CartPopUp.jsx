"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronRightIcon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const CardPopUp = ({ isOpen, setOpen, product }) => {
  const [isCreatingCart, setIsCreatingCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [userId, setUserId] = useState(null);
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
  }, []);

  const getStoredCartId = () => {
    if (typeof window !== "undefined") {
      const storedCartId = localStorage.getItem("cartId");

      return storedCartId;
    }
    return null;
  };
  useEffect(() => {
    const storedCartId = getStoredCartId();

    try {
      if (!userId && !storedCartId) {
        // If there's no cartId in local storage, generate one with UUID
        const identifier = uuidv4();
        localStorage.setItem("cartId", identifier);
        setUserId(identifier); // Set userId to the generated identifier
      } else {
        setUserId(storedCartId); // Set userId to the stored cartId
      }
    } catch (err) {
      console.log(err);
    }

    // ... (other code)
  }, []);

  const closeModal = () => {
    setOpen(false);
  };

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select size and color");
      return;
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
        closeModal();
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
      closeModal();
    } catch (error) {
      console.error("Error sending products to cart:", error);
      // Handle error
    } finally {
      setIsCreatingCart(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex lg:items-center lg:justify-center justify-end items-end overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-opacity-75 bg-black"
        >
          <div className="relative w-full max-w-3xl mx-auto md:my-6 bg-white  shadow-lg outline-none focus:outline-none h-auto">
            <div className="relative flex flex-row w-full border-0 rounded-lg">
              <div className="hidden lg:block bg-gray-200 aspect-h-4 aspect-w-7 relative w-full">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="object-cover object-center w-full h-full"
                  width={600}
                  height={500}
                />
              </div>
              <div className="w-full p-6 py-10 flex flex-col justify-center relative">
                <div className="flex items-start justify-between mb-2 md:mb-4">
                  <h1 className="text-3xl font-semibold">{product.name}</h1>
                </div>
                <div className="text-md md:text-lg leading-relaxed text-gray-800 ">
                  <p className="mb-4">
                    {" "}
                    ₦ {product.price.toLocaleString()} NGN
                  </p>
                  <div className="flex  justify-between lg:block">
                    <div className="mb-4 flex justify-between pr-2">
                      <label className="mr-2 text-md">Size:</label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="border  px-9 py-2"
                      >
                        <option>Select</option>
                        {product.sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4 pr-2 flex justify-between">
                      <label className="mr-2">Color:</label>
                      <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="border px-9 py-2"
                      >
                        <option>Select</option>
                        {product.color.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <label className="mr-2">Quantity:</label>
                    <div>
                      {" "}
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
                          size="20px"
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
                <div className=" absolute top-0 m-4 right-0">
                  <button
                    className="outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={closeModal}
                  >
                    <XMarkIcon className="h-7 w-7" />
                  </button>
                </div>
                <div className="flex justify-center md:justify-end">
                  <Link
                    href={`/products/${product.id}`}
                    className="border-b border-black mt-4 "
                  >
                    View Full Product
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CardPopUp;
