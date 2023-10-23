"use client";
import { useCart } from "../context/CartContext";
import products from "../libs/ProductsDB"; // Import your product database
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PaystackPayment = async () => {
  return <div>Hello</div>;
};
const shippingPrice = 10000;
export default function Example() {
  const router = useRouter();

  const { cartData, user, getGuestCartFromStorage } = useCart();

  const guestCartData = getGuestCartFromStorage();
  const [Amount, setAmount] = useState(0);
  const cart = cartData || guestCartData;
  useEffect(() => {
    // Calculate total amount based on the cart items and product prices
    const calculatedAmount = calculateTotalAmount(
      cartData?.cart || guestCartData
    );
    setAmount(calculatedAmount);
  }, [cartData, guestCartData]);

  function calculateTotalAmount(items) {
    return items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);

      if (product) {
        return total + item.quantity * product.price;
      } else {
        console.warn(`Product with id ${item.id} not found.`);
        return total;
      }
    }, 0);
  }

  const totalAmount = Amount + shippingPrice;

  useEffect(() => {
    // Redirect if the cart is empty
    if (!cart || cart.length === 0) {
      router.push("/");
      toast.error("Cart is Empty.");
    }
  }, [cartData, router]);

  return (
    <div className="isolate bg-white px-6 py-14 lg:px-8 mx-auto flex flex-col lg:flex-col">
      <form onSubmit={PaystackPayment} className="mx-auto mt-6 max-w-xl">
        <div className="mb-7">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Contact
            </h2>
            <p className="text-md font-light tracking-tight text-gray-400 leading-7 sm:text-lg ">
              Don't have an account?
              <Link href="/account">
                <span className="underline">Sign up</span>
              </Link>
            </p>
          </div>
          <div className="mt-2.5">
            <input
              type="text"
              name="Email"
              id="first-name"
              autoComplete="given-name"
              className="block w-full px-3.5 py-3 text-gray-900 ring-gray-300 ring-1 ring-inset  placeholder:text-gray-400 placeholder:text-sm focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              placeholder="Email"
              value={user ? user.email : ""}
            />
          </div>
        </div>
        <div className="mx-auto max-w-2xl text-start mb-7">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl ">
            Payment
          </h2>
          <p className="text-md font-light tracking-tight text-gray-400 leading-7 sm:text-lg">
            All transactions are secure and encrypted.
          </p>
        </div>

        <h1 className="font-semibold">Billing Address</h1>
        <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
          <div>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full px-3.5 py-3 text-gray-900 ring-gray-300 ring-1 ring-inset  placeholder:text-gray-400 placeholder:text-sm focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="First name"
                value={user ? user.given_name : ""}
              />
            </div>
          </div>
          <div>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full  px-3.5 py-3 placeholder:text-sm text-gray-900 ring-gray-300 ring-1 ring-inset  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="Last name"
                value={user ? user.family_name : ""}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <input
                type="text"
                name="address"
                id="company"
                autoComplete="address"
                className="block w-full  px-3.5 py-3 text-gray-900 ring-gray-300  ring-1 ring-inset placeholder:text-sm placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="Address"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <input
                type="text"
                name="Phone number"
                id="company"
                autoComplete="tel"
                className="block w-full placeholder:text-sm ring-gray-300 px-3.5 py-3 text-gray-900  ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="Phone number"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <input
                type="text"
                name="Apartment"
                id="company"
                autoComplete="tel"
                className="block w-full placeholder:text-sm ring-gray-300 px-3.5 py-3 text-gray-900  ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="Apartment,suite,etc (optional)"
              />
            </div>
          </div>

          <div className="sm:col-span-2 grid sm:grid-flow-col sm:gap-x-4 grid-flow-row">
            <div className=" mt-2.5">
              <input
                type="text"
                name="City"
                id="phone-number"
                autoComplete="city"
                className="block w-full border-0 placeholder:text-sm px-3.5 py-3  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 "
                placeholder="City"
              />
            </div>
            <div className=" mt-2.5">
              <input
                type="text"
                name="state"
                id="phone-number"
                autoComplete="state"
                className="block w-full border-0 placeholder:text-sm px-3.5 py-3  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 "
                placeholder="State/Province"
              />
            </div>

            <div className=" mt-2.5">
              <input
                type="text"
                name="postal code"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full border-0 placeholder:text-sm px-3.5 py-3  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 "
                placeholder="Postal Code"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 bg-[#f7f5f0] p-5">
          <div className="flex justify-between">
            <h2>Subtotal:</h2>
            <h2>₦{Amount.toLocaleString()} NGN</h2>
          </div>
          <div className="flex justify-between">
            <h2>Shipping:</h2>
            <h2>₦{shippingPrice.toLocaleString()} NGN</h2>
          </div>
          <div className="flex justify-between">
            <h2>Total</h2>
            <h2>₦{totalAmount.toLocaleString()} NGN</h2>
          </div>
        </div>
        <button
          type="submit"
          className="block w-full  bg-black px-3.5 py-4 text-center text-lg font-semibold text-white shadow-sm hover:bg-opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Complete order
        </button>
      </form>
    </div>
  );
}
