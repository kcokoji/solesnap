"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

const shippingPrice = 10000;
export default function Example() {
  const { userId, user, cartData, cartId } = useCart();

  const router = useRouter();
  const [email, setEmail] = useState(user ? user.email : "");
  const [firstName, setFirstName] = useState(user ? user.family_name : "");
  const [lastName, setLastName] = useState(user ? user.given_name : "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [Amount, setTotalAmount] = useState(0);
  const [orderLoading, setOrderLoading] = useState(false);

  const initialTotalAmount = Amount.totalAmount;
  const totalAmount = initialTotalAmount + shippingPrice;

  useEffect(() => {
    // Redirect if the cart is empty
    if (!cartData) {
      router.push("/");
    }

    const fetchTotalAmount = async () => {
      try {
        const res = await fetch(`/api/checkout/${userId || cartId}`);
        const data = await res.json();
        setTotalAmount(data);
      } catch (err) {
        console.error("Error fetching total Amount ", err);
      }
    };

    fetchTotalAmount();
  }, [cartData, router, userId, cartId]);

  const config = {
    public_key: process.env.FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      name: firstName + lastName,
      email: email,
      phone_number: phoneNumber,
    },
    customizations: {
      title: "Solesnap",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setOrderLoading(true);
    // Trigger Flutterwave payment modal
    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        if (response.status !== "completed") {
          setOrderLoading(false);
          toast.error("Failed Transaction");
        }
        toast.success("Order Placed");
        setOrderLoading(false);
        router.push("/");
        closePaymentModal();
      },
      onClose: () => {
        toast.error("Transaction Canceled");
        setOrderLoading(false);
      },
    });
  };

  return (
    <div className="isolate bg-white px-6 py-14 lg:px-8 mx-auto flex flex-col lg:flex-col">
      <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-xl">
        <div className="mb-7">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Contact
            </h2>
            <p className="text-md font-light tracking-tight text-gray-400 leading-7 sm:text-lg ">
              Don&apos;t have an account?
              <Link href="/account">
                <span className="underline">Sign up</span>
              </Link>
            </p>
          </div>
          <div className="mt-2.5">
            <input
              type="text"
              name="Email"
              id="email"
              autoComplete="given-name"
              className="block w-full px-3.5 py-3 text-gray-900 ring-gray-300 ring-1 ring-inset  placeholder:text-gray-400 placeholder:text-sm focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
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
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                required
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
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                required
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
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <input
                type="text"
                name="Phone number"
                id="phone number"
                autoComplete="tel"
                className="block w-full placeholder:text-sm ring-gray-300 px-3.5 py-3 text-gray-900  ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="Phone number"
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-2 grid sm:grid-flow-col sm:gap-x-4 grid-flow-row">
            <div className=" mt-2.5">
              <input
                type="text"
                name="City"
                id="city"
                autoComplete="city"
                className="block w-full border-0 placeholder:text-sm px-3.5 py-3  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 "
                placeholder="City"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                required
              />
            </div>
            <div className=" mt-2.5">
              <input
                type="text"
                name="state"
                id="state"
                autoComplete="state"
                className="block w-full border-0 placeholder:text-sm px-3.5 py-3  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 "
                placeholder="State/Province"
                onChange={(event) => {
                  setState(event.target.value);
                }}
                required
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
                onChange={(event) => {
                  setPostalCode(event.target.value);
                }}
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-10 bg-[#f7f5f0] p-5">
          <div className="flex justify-between">
            <h2>Subtotal:</h2>
            <h2>
              ₦{initialTotalAmount && initialTotalAmount.toLocaleString()} NGN
            </h2>
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
          disabled={orderLoading}
        >
          {orderLoading ? (
            <div className="flex items-center justify-center">
              <ScaleLoader
                color="white"
                speedMultiplier={3}
                size="20px"
                loading={true}
                aria-label="Loading Spinner"
              />
            </div>
          ) : (
            <>Complete Your Order</>
          )}
        </button>
      </form>
    </div>
  );
}
