import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Subscribe() {
  return (
    <div
      className="relative isolate overflow-hidden  bg-[#f7f5f0] py-14 lg:py-28"
      id="subscribe"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex justify-center items-center">
          <div className="max-w-xl lg:max-w-lg text-black">
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
              Join Our Community
            </h2>
            <p className="mt-4 text-sm">
              <span className="font-extrabold text-lg md:text-xl">
                {" "}
                Get 10% off your first order{" "}
              </span>
              and be the first to get the latest updates on our promotion
              campaigns, products and services.
            </p>

            <form action="" method="POST" className="my-7 flex max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto border bg-white px-3.5 py-2 text-black sm:text-sm sm:leading-6 rounded-none"
                placeholder="Enter email address"
              />
              <button
                type="submit"
                className="flex-none  px-3.5 py-2.5 text-sm  border  font-semibold "
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
