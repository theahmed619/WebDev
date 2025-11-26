"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const destinations = ["Paris", "Brazil", "USA"];

  const router=useRouter()

  return (
    <div className="text-white flex flex-col justify-center items-center h-full gap-4">
      <div className="text-2xl">
        <h1>Choose your Destination</h1>
      </div>
      <div className=" flex flex-col gap-5 ">
        {destinations.map((d, index) => (
          <div key={index} className=" flex items-center justify-center h-[100px] w-[200px]  bg-white text-black rounded-2xl hover:optional-[0.5] transition-all cursor-pointer hover:text-blue-400" onClick={()=>router.push(`/destination/${d}`)}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
