import Image from "next/image";
import Link from "next/link";

const d = new Date();
const year = d.getFullYear();

export default function Footer() {
  return (
    <div className="relative isolate overflow-hidden bg-black py-10 sm:py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 mb-10">
          <div className="max-w-xl lg:max-w-lg">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              SOLESNAP
            </h1>
            <p className="mt-4  text-base  text-gray-300">
              The premier e-commerce destination where style meets luxury,
              renowned for providing its customers with specially curated
              high-fashion and cutting-edge designer shoes and accessories.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-medium text-white">Our Socials</h2>
            <div className="flex my-2 gap-x-6">
              <Link href="/">
                <Image
                  src="/img/facebook.svg"
                  width={24}
                  height={24}
                  alt="Facebook"
                />
              </Link>
              <Link href="/">
                <Image
                  src="/img/instagram.svg"
                  width={24}
                  height={24}
                  alt="Instagram"
                />
              </Link>
              <Link href="/">
                <Image
                  src="/img/twitter.svg"
                  width={24}
                  height={24}
                  alt="Twitter"
                />
              </Link>
            </div>
          </div>
        </div>
        <hr className="my-7" />
        <h1 className="text-center text-gray-400">
          @ {year}{" "}
          <a href="" className="underline">
            Okoji Kelechi
          </a>
          .All Rights Reserved
        </h1>
      </div>
    </div>
  );
}
