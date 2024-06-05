import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineArrowLeft } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PizzaList = ({ addToCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const [cartCount, setCartCount] = useState(0); // State to keep track of the number of items in the cart

  useEffect(() => {
    // Fetch all pizzas from your API endpoint
    fetch("/pizzas")
      .then((response) => response.json())
      .then((data) => setPizzas(data))
      .catch((error) => console.error("Error fetching pizzas:", error));
  }, []);

  // Function to add pizza to cart and update the cart count
  const handleAddToCart = (pizza) => {
    addToCart(pizza); // Call addToCart function passed as prop
    setCartCount(cartCount + 1); // Update cart count
    toast.success(`${pizza.name} added to cart!`); // Show notification
  };

  return (
    <div>
      <div className="flex items-center mb-4  mt-10 z-10">
        <Link to="/home" className="mr-4">
          <AiOutlineArrowLeft className="text-blue-500 text-xl" />
        </Link>
        <h2 className="text-4xl text-red-500 font-extralight pb-2">All Pizzas</h2>
        <Link to="/cart" className="ml-auto">
          <div className="flex items-center">
            <AiOutlineShoppingCart className="text-blue-500 text-2xl" />
            <span className="ml-1">{cartCount}</span> {/* Display cart count */}
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 z-10">
        {pizzas.map((pizza) => (
          <div
            key={pizza.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 "
          >
            <img
              className="w-full h-32 object-cover object-center"
              src={`https://source.unsplash.com/800x600/?pizza,${pizza.name}`}
              alt={`Pizza ${pizza.name}`}
            />

            <div className="p-4 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{pizza.name}</h2>
              <p className="text-gray-600 font-thin mb-2">{pizza.ingredients}</p>

              <div className="flex items-center justify-between">
                <Link to="/checkout" className="show-btn cursor-pointer flex">
                  <h3 className='text-blue-500'>Place an order</h3>
                </Link>

                <button onClick={() => handleAddToCart(pizza)} className="cursor-pointer">
                  <AiOutlineShoppingCart className="text-blue-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
