import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { IoPizzaOutline } from 'react-icons/io5';

const LoggedInNavbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="p-4 mb-3">
      <div className="container mx-auto flex justify-between items-center">

        <Link
          to="/"
          className="text-red-600 font-bold text-xl flex items-center gap-3"
        >
          <IoPizzaOutline className="black font-bold text-black text-2xl" /> Deluxe
        </Link>
        {/* desktop-version */}
        <div className="pc hidden lg:flex items-center gap-4">
          <div className="flex items-center cursor-pointer bg-slate-200/50 shadow-inner rounded-full px-2 py-2  ">
            <BsPersonFill className="text-2xl bg-red-600 rounded-full shadow-xl h-[37px] p-[10px] cursor-pointer w-[37px]" />
            <p className="pl-2">Welcome, User!</p>
            <button className="ml-2 underline">
              Logout
            </button>
          </div>
        </div>

        <div className="lg:hidden">
          <button
            className="text-black focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:flex block lg:items-center fixed top-0 right-0 h-full bg-white/70 transition-transform ease-in-out duration-300">
            <div className="sm:flex flex-col items-start w-64 p-4">
              <button
                className="text-3xl rounded-full   hover:text-red-500 mb-4 lg:mb-0 lg:mr-4"
                onClick={closeMenu}
              >
                <AiOutlineClose />
              </button>

              <div id="#li" className="menu flex justify-center flex-col mt-8 gap-3 ">
                <div className="flex items-center">
                  <BsPersonFill className="text-2xl bg-gray-200 rounded-full shadow-xl h-[37px] p-[10px] cursor-pointer w-[37px]" />
                  <p className="pl-2">Welcome, User!</p>
                  <button className="ml-2 underline">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LoggedInNavbar;
