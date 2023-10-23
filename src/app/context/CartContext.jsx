"use client";

// CartContext.js
import { useState, createContext, useContext, useEffect } from "react";
import useSWR from "swr";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [guestCartLength, setGuestCartLength] = useState(0);

  useEffect(() => {
    const getKindeSession = async () => {
      try {
        const res = await fetch("/api/kindeSession");
        const data = await res.json();

        if (data && data.user && data.user.id) {
          setUserId(data.user.id);
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };

    getKindeSession();
  }, []);

  const { data: cartData, mutate: mutateCart } = useSWR(
    userId ? `/api/cart/${userId}` : null,
    async (key) => {
      const res = await fetch(key);
      const data = await res.json();

      return data;
    },
    {
      initialData: { cart: [] },
      refreshInterval: 1,
    }
  );

  const cartLength = cartData?.cart.length || 0;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedGuestCart =
        JSON.parse(localStorage.getItem("guestCart")) || [];
      setGuestCartLength(storedGuestCart.length);
    }
  }, []);

  const updateCartData = (newCartData) => {
    mutateCart(newCartData);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      // Refresh the page whenever there is a change in local storage
      window.location.reload();
    };

    // Listen for changes in local storage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const getGuestCartFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedGuestCart =
        JSON.parse(localStorage.getItem("guestCart")) || [];
      return storedGuestCart;
    }
    return [];
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        updateCartData,
        userId,
        getGuestCartFromStorage,
        cartLength,
        guestCartLength,
        user,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
