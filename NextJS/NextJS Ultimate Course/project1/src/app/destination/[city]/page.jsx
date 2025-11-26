"use client";
import { useParams } from "next/navigation";
import React from "react";
import crow from "@/assets/crow.jpg";
import Image from "next/image";
function page({ params }) {
  const { city } = useParams();
  return (
    <div className="text-white flex flex-col w-[50%] h-full pt-[100px]">
      <h1 className="mt-[100px]" > {city} is the beautiful city</h1>

      <div className="">
        {city == "Paris" && (
          <Image src={crow} width={200} height={200} alt="paris img"  />
        )}
      </div>
    </div>
  );
}

export default page;
