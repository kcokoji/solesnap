"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CartItem from "./components/CartItem";
import products from "../libs/ProductsDB";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartData, userId, updateCartData, getGuestCartFromStorage } =
    useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Calculate the initial total amount based on the initial cart data
    const cartItems = userId ? cartData?.cart : getGuestCartFromStorage();
    if (cartItems && cartItems.length > 0) {
      const initialTotalAmount = calculateTotalAmount(cartItems);
      setTotalAmount(initialTotalAmount);
    } else {
      setTotalAmount(0);
    }
    setIsLoading(false);
  }, [cartData, userId, getGuestCartFromStorage]);

  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);

      if (product) {
        return total + item.quantity * product.price;
      } else {
        console.warn(`Product with id ${item.id} not found.`);
        return total;
      }
    }, 0);
  };

  const handleQuantityChange = async (productId, newQuantity, userId) => {
    const updatedCartData = (cartData?.cart || []).map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    updateCartData({ ...cartData, cart: updatedCartData });

    if (userId) {
      try {
        const res = await fetch("/api/cart", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            productId: productId,
            quantity: newQuantity,
          }),
        });

        if (!res.ok) {
          console.error("Failed to update item quantity:", res.statusText);
        }
      } catch (err) {
        console.error("Error updating item quantity:", err);
      }
    } else {
      const storedGuestCart =
        JSON.parse(localStorage.getItem("guestCart")) || [];
      const updatedCart = storedGuestCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));

      // Recalculate and update the total amount for guest cart
      const updatedTotalAmount = calculateTotalAmount(updatedCart);
      setTotalAmount(updatedTotalAmount);
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

  const cartItems = userId ? cartData?.cart : getGuestCartFromStorage();

  return (
    <div className="lg:px-20 bg-white mx-auto flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold text-center lg:px-4 mt-10">
        Your Cart
      </h1>

      {cartItems && cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="lg:w-1/2 ">
            {cartItems.map((item, index) => (
              <div key={index} className="p-6 ">
                <CartItem
                  productId={item.id}
                  size={item.size || item.Size}
                  color={item.color}
                  userId={userId}
                  quantity={item.quantity}
                  onQuantityChange={handleQuantityChange}
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
              <Link
                href="/checkout"
                className="bg-black text-white hover:opacity-75 text-center w-full py-3"
              >
                CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-6">
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
