import { Fragment } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default function Example() {
  return (
    <Fragment>
      <div className=" bg-white z-30">
        <div className=" flex justify-center items-center  z-10  ">
          <div className="flex min-h-full items-end justify-center  text-center sm:items-center sm:p-0">
            <div className="relative py-10 lg:py-0 rounded-lg bg-white text-left lg:shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5  sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      className="h-10 w-10 text-black"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Sign out
                    </h3>
                    <div className="mt-2">
                      <p className="text-lg text-gray-500">
                        Are you sure you want to sign out?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <div className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                  <LogoutLink>Sign Out</LogoutLink>
                </div>
                <div className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                  <Link href="/dashboard">Cancel</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
