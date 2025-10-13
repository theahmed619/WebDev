import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    navigate("/login");
  };

  return (
    <>
      <div className="w-full flex justify-between h-20 items-center bg-gray-200 shadow px-5">
        <div className="w-[10%] flex items-center h-full">
          <h1 className="font-bold text-zinc-800">LOGO</h1>
        </div>
        <div className="w-[50%]">
          <ul className="w-full flex gap-6 list-none items-center  text-zinc-800 font-medium ">
            <li className="cursor-pointer">HOME</li>
            <li className="cursor-pointer">ABOUT</li>
            <li className="cursor-pointer">CONTACT </li>
          </ul>
        </div>
        <button className="cursor-pointer" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
