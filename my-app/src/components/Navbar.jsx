import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { IoPizzaOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ isLoggedIn }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Import the useNavigate hook

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Handle logout function
  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Logout successful, navigate to the login page
        navigate("/login");
      } else {
        // Handle logout failure
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error.message);
      // Show error toast
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <nav className="p-4 mb-5 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/home"
          className="text-red-600 font-bold text-xl flex items-center gap-3"
        >
          <IoPizzaOutline className="black font-bold text-black text-2xl" /> Deluxe
        </Link>
        {/* desktop-version */}
        <div className="pc hidden lg:flex items-center gap-4">
          <Link
            to="/home"
            className="text-black hover:text-red-500 mb-4 lg:mb-0 lg:mr-4"
          >
            Home
          </Link>
          <Link
            to="/restaurants"
            className="text-black hover:text-red-500 mb-4 lg:mb-0 lg:mr-4"
          >
            Restaurants
          </Link>
          <Link
            to="/pizzas"
            className="text-black hover:text-red-500 mb-4 lg:mb-0 lg:mr-4"
          >
            Catalogue
          </Link>
          <Link
            to="/menuManagement"
            className="text-black hover:text-red-500 mb-4 lg:mb-0 lg:mr-4"
          >
            Manage
          </Link>

          {isLoggedIn ? (
            // If the user is logged in, show a welcome message and logout button
            <div className="flex items-center cursor-pointer bg-slate-200/50 shadow-inner rounded-full px-2 py-2">
              <BsPersonFill className="text-2xl bg-red-600 rounded-full shadow-xl h-[37px] p-[10px] cursor-pointer w-[37px]" />
              <p className="pl-2">{`Welcome!`}</p>
              <button onClick={handleLogout} className="ml-2 underline">
                Logout
              </button>
            </div>
          ) : (
            // If the user is not logged in, show the logout button
            <Link to='/login' className="flex items-center cursor-pointer bg-slate-200/50 shadow-inner rounded-full px-2 py-2">
              <BsPersonFill className="text-2xl bg-red-600 rounded-full shadow-xl h-[37px] p-[10px] cursor-pointer w-[37px]" />
              <p className="pl-2 underline">Logout</p>
            </Link>
          )}
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
                className="text-3xl rounded-full hover:text-red-500 mb-4 lg:mb-0 lg:mr-4"
                onClick={closeMenu}
              >
                <AiOutlineClose />
              </button>

              <div id="#li" className="menu flex justify-center flex-col mt-8 gap-3">
                <Link
                  to="/home"
                  className="text-black hover:text-red-500 mb-4 lg:mb-0 lg:mr-4"
                >
                  Home
                </Link>
                <Link
                  to="/restaurants"
                  className="text-black hover:text-red-500 mb-4 lg:mb-0 lg:mr-4"
                >
                  Restaurants
                </Link>
                <Link
                  to="/pizzas"
                  className="text-black hover:text-red-500 mb-4 lg:mb-0 lg:mr-4"
                >
                  Catalogue
                </Link>
                <Link
                  to="/menuManagement"
                  className="text-black hover:text-red-500 mb-4 lg:mb-0 lg:mr-4"
                >
                  Manage
                </Link>

                {isLoggedIn ? (
                  // If the user is logged in, show a welcome message and logout button
                  <div className="flex items-center">
                    <BsPersonFill className="text-2xl bg-gray-200 rounded-full shadow-xl h-[37px] p-[10px] cursor-pointer w-[37px]" />
                    <p className="pl-2">{`Welcome!`}</p>
                    <button onClick={handleLogout} className="ml-2 underline">
                      Logout
                    </button>
                  </div>
                ) : (
                  // If the user is not logged in, show the login link
                  <Link to='/login' className="flex items-center cursor-pointer bg-slate-200/50 shadow-inner rounded-full px-2 py-2">
                  {/* <BsPersonFill className="text-2xl bg-red-600 rounded-full shadow-xl h-[37px] p-[10px] cursor-pointer w-[37px]" /> */}
                  <p className="pl-2 underline">Logout</p>
                </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
