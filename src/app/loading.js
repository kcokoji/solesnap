import React from "react";
import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="bg-white h-screen w-screen z-50 flex justify-center items-center">
      <ScaleLoader
        color="black"
        speedMultiplier={3}
        loading={true}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
