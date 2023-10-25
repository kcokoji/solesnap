"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

export default function Page() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  // First useEffect to fetch user ID
  useEffect(() => {
    const fetchKindeSession = async () => {
      try {
        const response = await fetch("/api/kindeSession");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch Kinde session: ${response.statusText}`
          );
        }

        const data = await response.json();

        const { user } = data;
        setUser(user);
        setLoading(false); // Set loading to false once user data is fetched
      } catch (error) {
        console.error("Error fetching Kinde session:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    // Run only on the client side
    fetchKindeSession();
  }, []); // Empty dependency array to run only once

  // Second useEffect to send user ID to API route
  useEffect(() => {
    const sendUserIdToApi = async () => {
      try {
        const updateResponse = await fetch(`/api/accounts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
          }),
        });

        if (!updateResponse.ok) {
          throw new Error(
            `Failed to update user data: ${updateResponse.statusText}`
          );
        }
      } catch (updateError) {
        console.error("Error updating user data:", updateError);
      }
    };

    // Run only on the client side
    sendUserIdToApi();
  }, [user]); // Dependency on user to run whenever user changes

  return (
    <div className="min-h-screen mx-auto p-10 my-20 flex justify-center items-center">
      {loading ? ( // Display loading spinner while data is being fetched
        <div className="bg-white h-screen w-screen z-50 flex justify-center items-center">
          <ScaleLoader
            color="black"
            speedMultiplier={3}
            loading={true}
            aria-label="Loading Spinner"
          />
        </div>
      ) : user ? (
        <div className="">
          <h1 className="text-3xl md:text-4xl font-bold lg:font-extrabold my-9">
            Welcome {user.family_name}
          </h1>

          <h2 className="text-center text-xl md:text-2xl font-bold mb-20">
            Account Overview
          </h2>
          <Link href="/logout" className=" p-4 bg-black text-white my-20">
            Logout
          </Link>
        </div>
      ) : (
        <div>
          <p>No user data available.</p>
        </div>
      )}
    </div>
  );
}
