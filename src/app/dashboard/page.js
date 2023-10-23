"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

export default function Page() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getKindeSession = async () => {
      try {
        const res = await fetch("/api/kindeSession");
        const data = await res.json();

        // Update state with user data
        setUser(data.user);

        // If user ID is available, send it to your API
        if (data.user && data.user.id) {
          await fetch(`/api/accounts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: data.user.id,
            }),
          });
          localStorage.clear();
        }
      } catch (error) {
        console.error("Error fetching Kinde session:", error);
      }
    };

    getKindeSession();
  }, []);

  return (
    <div className="h-screen mx-auto p-10">
      {user ? (
        <div>
          <h1 className="text-3xl md:text-4xl font-bold lg:font-extrabold">
            Welcome {user.family_name}
          </h1>

          <h2 className="text-center text-xl md:text-2xl font-bold">
            Account Overview
          </h2>
          <Link href="/logout">Logout</Link>
        </div>
      ) : (
        <div className="bg-white h-screen w-screen z-50 flex justify-center items-center">
          <ScaleLoader
            color="black"
            speedMultiplier={3}
            loading={true}
            aria-label="Loading Spinner"
          />
        </div>
      )}
    </div>
  );
}
