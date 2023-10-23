"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import products from "@/app/libs/ProductsDB";

const CartItem = ({
  productId,
  size,
  color,
  userId,
  onQuantityChange,
  quantity,
}) => {
  const [product, setProduct] = useState(null);
  const [Usequantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchProduct = async () => {
      const productInCart = products.find((p) => p.id === productId);

      if (productInCart) {
        setProduct({
          ...productInCart,
        });
      }
    };

    fetchProduct();
  }, [productId]);

  const productExists = product !== null;

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(productId, newQuantity, userId);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(productId, newQuantity, userId);
  };

  const handleDelete = async () => {
    try {
      if (userId) {
        // User is logged in, delete from the server-side cart
        const res = await fetch("/api/cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            productId: productId,
          }),
        });

        if (res.ok) {
          // Handle the success (e.g., update UI)
          setProduct(null);
          onQuantityChange(productId, 0); // Set quantity to 0 to remove the item
        } else {
          // Handle the error, e.g., show an error message
          console.error("Failed to remove item from the cart:", res.statusText);
        }
      } else {
        // User is a guest, delete from the local guest cart
        const storedGuestCart =
          JSON.parse(localStorage.getItem("guestCart")) || [];
        const updatedCart = storedGuestCart.filter(
          (item) => item.id !== productId
        );
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));

        // Handle the success (e.g., update UI)
        setProduct(null);
        onQuantityChange(productId, 0); // Set quantity to 0 to remove the item
      }
    } catch (err) {
      console.error("Error removing item from the cart:", err);
    }
  };

  return (
    <div className="flex relative">
      {productExists && (
        <div className="bg-gray-200 aspect-w-3 aspect-h-1 w-[10rem] h-[10rem]">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            width={300}
            height={300}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}
      <div className="px-4 flex items-center">
        <div>
          {productExists && (
            <>
              <h2 className="text-md text-gray-700">{product.name}</h2>
              <p className="text-sm  mt-1 font-medium text-gray-900">
                <span className="text-sm"> ₦</span>
                {product.price.toLocaleString()} NGN
              </p>
              <div className="flex gap-x-2 text-sm my-2">
                <p className="text-sm ">Size:{size}</p>
                <p className="text-sm ">Color:{color}</p>
              </div>
              <div className="mb-4">
                <button className="border px-3" onClick={handleDecrease}>
                  -
                </button>
                <span className="mx-2">{Usequantity}</span>
                <button className="border px-3" onClick={handleIncrease}>
                  +
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {productExists && (
        <div className="absolute right-0 md:bottom-10 bottom-0">
          <button onClick={handleDelete} className="underline">
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default CartItem;
