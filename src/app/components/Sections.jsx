import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Sections() {
  return (
    <>
      <div className=" mx-auto flex flex-row items-center  rounded-md my-5 lg:my-0">
        <div className=" text-left lg:p-[6rem] hidden lg:block">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Shop Men Shoes
          </h1>
          <Link href="/products" className="bg-black text-white py-2 px-4 ">
            Shop Now
          </Link>
        </div>
        <div className=" flex-1 relative">
          <div className="aspect-h-4 aspect-w-3 w-full rounded-md bg-gray-200 md:group-hover:opacity-75 relative">
            <Image
              src="/img/men.jpg"
              alt="men"
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              width={500}
              height={500}
            />
          </div>
          <div className=" absolute top-24 left-0 lg:order-2 text-left lg:mx-10 lg:hidden block mx-4">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 ">Shop Men</h1>
            <Link
              href="/products"
              className="bg-black text-white py-2 px-4 hover:bg-white hover:text-black inline-block"
            >
              Shop Now <ChevronRightIcon className="h-5 w-5 inline" />
            </Link>
          </div>
        </div>
      </div>
      <div className=" mx-auto flex flex-row items-center  rounded-md my-5 lg:my-0">
        <div className="lg:order-2 text-left lg:mx-10 hidden lg:block">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 ">
            Shop Women Shoes
          </h1>
          <Link
            href="/products"
            className="bg-black text-white py-2 px-4   inline-block"
          >
            Shop Now
          </Link>
        </div>
        <div className="lg:order-1 flex-1 relative">
          <div className="aspect-h-4 aspect-w-3 w-full rounded-md bg-gray-200 md:group-hover:opacity-75 relative">
            <Image
              src="/img/women.jpg"
              alt="men"
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              width={500}
              height={500}
            />
          </div>
          <div className=" absolute  bottom-10 left-0 lg:order-2 text-left lg:mx-10 lg:hidden block mx-4">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 ">Shop Women</h1>
            <Link
              href="/products"
              className="bg-black text-white py-2 px-4 hover:bg-white hover:text-black inline-block"
            >
              Shop Now <ChevronRightIcon className="h-5 w-5 inline" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
