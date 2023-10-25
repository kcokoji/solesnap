"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import CartItem from "./components/CartItem";
import products from "../libs/ProductsDB";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cartData, userId, cartId } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quantityMap, setQuantityMap] = useState({});
  const [isCheckingOut, setIsCheckingOut] = useState(false); // Loading state
  const router = useRouter();

  const calculateTotalAmount = useCallback(
    (items) => {
      return items.reduce((total, item) => {
        const product = products.find((p) => p.id === item.id);

        if (product) {
          const quantity = quantityMap[item.id] || 1;
          return total + quantity * product.price;
        } else {
          console.warn(`Product with id ${item.id} not found.`);
          return total;
        }
      }, 0);
    },
    [quantityMap]
  );

  const updateQuantity = (productId, newQuantity) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [productId]: newQuantity,
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    const cartItems = cartData?.cart;

    if (cartItems && cartItems.length > 0) {
      const initialTotalAmount = calculateTotalAmount(cartItems);
      setTotalAmount(initialTotalAmount);
    } else {
      setTotalAmount(0);
    }

    setIsLoading(false);
  }, [cartData, userId, quantityMap, calculateTotalAmount]);

  const initiateCheckout = async () => {
    try {
      setIsCheckingOut(true); // Set loading state to true

      const response = await fetch(`/api/checkout/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalAmount: totalAmount,
        }),
      });

      if (response.ok) {
        router.push("/checkout");
      }
    } catch (error) {
      console.error("Error during checkout initiation:", error);
    } finally {
      setIsCheckingOut(false); // Reset loading state after the operation is complete
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white h-screen w-screen z-50 flex justify-center items-center">
        <ScaleLoader
          color="black"
          speedMultiplier={3}
          loading={true}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }

  const cartItems = cartData?.cart;

  return (
    <div className="lg:px-20 bg-white mx-auto flex flex-col">
      {cartItems && cartItems.length > 0 ? (
        <>
          {" "}
          <h1 className="text-2xl md:text-3xl font-bold text-center lg:px-4 mt-10">
            Your Cart
          </h1>
          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="lg:w-1/2 ">
              {cartItems.map((item, index) => (
                <div key={index} className="p-6">
                  <CartItem
                    productId={item.id}
                    size={item.size || item.Size}
                    color={item.color}
                    userId={userId}
                    cartId={cartId}
                    quantity={item.quantity}
                    updateQuantity={updateQuantity}
                  />
                </div>
              ))}

              <div className="py-6">
                <Link
                  href="/products"
                  className="underline-offset-[6px] underline p-6 my-10"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            <hr className="hidden lg:block border-t border-gray-300 mx-4" />

            <div className="lg:w-1/4 p-8 lg:right-48 z-10 lg:fixed lg:rounded-sm bg-[#f7f5f0] lg:shadow-md">
              <h2 className="text-lg font-semibold mb-2">Total Amount</h2>
              <p className="text-sm text-gray-700 mb-4">
                Shipping will be calculated at checkout
              </p>
              <p className="text-lg font-bold mb-4">
                ₦{totalAmount.toLocaleString()} NGN
              </p>
              <div className="flex justify-center">
                <button
                  className="bg-black text-white hover:opacity-75 text-center w-full py-3"
                  onClick={initiateCheckout}
                  disabled={isCheckingOut} // Disable the button when loading
                >
                  {isCheckingOut ? (
                    <ScaleLoader
                      color="white"
                      speedMultiplier={3}
                      loading={true}
                    />
                  ) : (
                    "Checkout"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-6 h-screen flex items-center justify-center flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-center lg:px-4 mt-10">
            Your Cart
          </h1>
          <h1 className="text-sm md:text-lg">Your cart is currently empty</h1>
          <Link
            href="/products"
            className="mt-4 inline-block bg-black text-white px-5 py-3"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
