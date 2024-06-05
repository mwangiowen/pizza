import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/Hero';
import Footer from '../components/Footer';
import Restaurants from '../pages/Restaurants';
import RestaurantDetails from '../pages/RestaurantDetails';
import PizzaList from '../pages/PizzaList';
import MenuManagement from '../pages/Management';
import Cart from '../components/Cart';

const Home = () => {
  
  const [cart, setCart] = useState([]); // Initialize cart state

  // Function to add item to cart
  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
  };

  // Function to remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  // Function to update quantity of an item in the cart
  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    setCart(updatedCart);
  };
  
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Restaurants />
      <Routes>
        {/* Routes for different pages */}
        <Route path="/restaurants/*" element={<Restaurants />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/restaurants/:id/*"
          element={
            <div>
              <RestaurantDetails />
              <PizzaList />
            </div>
          }
        />
        <Route path="/pizzaList" element={<PizzaList 
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              addToCart={addToCart} />} />
        <Route path="/menuManagement" element={<MenuManagement />} />
      </Routes>
      
    </div>
  );
}

export default Home;
