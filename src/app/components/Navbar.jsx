"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  Bars3Icon,
  UserIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const navigation = [
  { name: "What's New", href: "/products" },
  { name: "Men", href: "/products" },
  { name: "Women", href: "/products" },
  { name: "Gifting", href: "/products" },
  { name: "Brands", href: "/products" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { cartLength } = useCart();

  const renderCartElement = () => {
    if (cartLength > 0) {
      return (
        <span className="absolute bottom-3 -right-2 flex items-center justify-center h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
          <span className=" inline-flex justify-center items-center rounded-full h-5 w-5 bg-black">
            <p className="text-white text-[0.6rem]">{cartLength}</p>
          </span>
        </span>
      );
    } else {
      return null;
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white inset-x-0 top-0 z-50 sticky  lg:border-b">
      <nav className="flex items-center justify-between p-2 px-6 lg:px-10">
        <div className="lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-8 w-8" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className=" hidden lg:flex ">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </div>

        <div className="flex items-center justify-center">
          <Link href="/">
            <span className="sr-only">Gradify</span>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              SOLESNAP
            </h1>
          </Link>
        </div>

        <div className="lg:hidden flex items-center justify-end relative">
          <Link href="/cart">
            <ShoppingBagIcon className="h-6 w-6" />
          </Link>
          {renderCartElement()}
        </div>

        <div className="hidden lg:flex items-center justify-center relative space-x-5">
          <Link href="/account">
            <UserIcon className="h-6 w-6" />
          </Link>
          <Link href="/cart">
            <ShoppingBagIcon className="h-6 w-6 " />
          </Link>
          {renderCartElement()}
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-gray-800 opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
            transition={{ duration: 0.3 }}
          />
        )}
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-y-0 left-0 z-50 w-full bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Gradify</span>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  SOLESNAP
                </h1>
              </Link>

              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6">
                <div className="space-y-2 py-6">
                  <div className="relative mb-4">
                    <input
                      type="text"
                      className="border-b-2 border-black focus:outline-none  rounded-none px-4 py-2 w-full"
                      placeholder="Search our store"
                    />
                    <div className="absolute right-0 top-0 mt-2 mr-4 text-gray-600">
                      <MagnifyingGlassIcon className="h-6 w-6" />
                    </div>
                  </div>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3  block px-3 py-2 text-xl   leading-10 text-gray-900  border-b"
                      onClick={toggleMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/account"
                    className="text-2xl mt-6  text-white flex items-center justify-center w-auto p-2 bg-black"
                    onClick={toggleMobileMenu}
                  >
                    {" "}
                    <UserIcon className="h-6 w-6 mr-2 inline" />
                    Account
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <hr />
      <nav
        className="lg:flex hidden items-center justify-center p-4 lg:px-8"
        aria-label="Global"
      >
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="mx-4  text-md leading-6 text-gray-700  border-b-2 border-transparent hover:border-black"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
