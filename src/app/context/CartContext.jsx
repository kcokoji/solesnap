"use client";

import { useState, createContext, useContext, useEffect } from "react";
import useSWR from "swr";

const CartContext = createContext();

const fetchUserSession = async () => {
  try {
    const res = await fetch("/api/kindeSession");
    const data = await res.json();

    if (data && data.user && data.user.id) {
      return data.user;
    } else {
      // Handle the case when "cartId" is not in local storage
      const storedCartId = getStoredCartId();
      if (storedCartId) {
        return { id: storedCartId };
      } else {
        return null;
      }
    }
  } catch (error) {
    console.error("Error fetching user session:", error);
    return null;
  }
};

const getStoredCartId = () => {
  if (typeof window !== "undefined") {
    const storedCartId = localStorage.getItem("cartId");

    return storedCartId;
  }
  return null;
};

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserSession = async () => {
      const userData = await fetchUserSession();
      if (userData) {
        setUserId(userData.id);
        setUser(userData);
      }
    };

    getUserSession();
  }, []);

  const { data: cartData } = useSWR(
    userId ? `/api/cart/${userId}` : null,
    async (key) => {
      try {
        const res = await fetch(key);
        const data = await res.json();
        return data;
      } catch (error) {
        return { cart: [] };
      }
    },
    {
      initialData: { cart: [] },
      refreshInterval: 1000,
    }
  );

  const cartLength = cartData?.cart.length || 0;

  return (
    <CartContext.Provider
      value={{
        cartData,
        userId,
        cartLength,
        user,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
