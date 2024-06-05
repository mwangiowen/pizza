import React from 'react';
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
      <div className="relative -z-10">
        <div
          id='round'
          className="h-96 bg-cover bg-center relative flex items-center justify-center"
          style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?restaurant/pizza")' }}
        >
          <div className="absolute inset-0"></div>
          <div className="text-center bg-black/40 rounded-md p-4 text-white z-10">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Restaurant</h1>
            <p className="text-lg mb-8">Experience the best culinary delights in town!</p>
            <Link
              to="/PizzaList"
              className="text-black hover:text-red-500 mb-4 lg:mb-0 lg:mr-4"
            >
              <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 cursor-pointer">
                Explore Menu
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroSection;