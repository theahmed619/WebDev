'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Nav = () => {

  const pathname=usePathname()

  return (
    <div className="w-full h-[50px] flex justify-between items-center fixed top-0 bg-white ">
      <div className="text-xl">🌎 Travel Guide</div>

      <div >
        <ul className="flex justify-center gap-[10px] ">
          <Link href={"/"} className={pathname=="/"?"text-blue-600":""}>
            <li>Home</li>
          </Link>
          <Link href={"/destination"} className={pathname=="/destination"?"text-blue-500":""}>
            <li>destinations</li>
          </Link>
          <Link href={"/contact"} className={pathname=="/contact"?"text-blue-500":""}>
            <li>Contact Us</li>
          </Link>
        </ul>
      </div>


    </div>
  );
};

export default Nav;
