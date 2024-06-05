import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginForm from "./pages/LoginForm";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import PizzaList from "./pages/PizzaList";
import MenuManagement from "./pages/Management";
import SignupForm from "./pages/SignupForm";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]); // Initialize cart state

  // Function to add item to cart
  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
  };

  return (
    <Router>
      <div className="App">
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/home/*" element={<Home />} />
            <Route
              path="/restaurants"
              element={
                <>
                        <Navbar /> {/* Navbar displayed on every page except login and signup */}

                  <Restaurants />
                  <Footer />
                </>
              }
            />
            <Route
              path="/restaurants/:id"
              element={
                <>
                        <Navbar /> {/* Navbar displayed on every page except login and signup */}

                  <RestaurantDetails />
                  <Footer />
                </>
              }
            />
            <Route
              path="/pizzas"
              element={
                <>
                        <Navbar /> {/* Navbar displayed on every page except login and signup */}

                  <PizzaList addToCart={addToCart} />
                  <Footer />
                </>
              }
            />
            <Route
              path="/menuManagement"
              element={
                <>
                        <Navbar /> {/* Navbar displayed on every page except login and signup */}

                  <MenuManagement />
                  <Footer />
                </>
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                        <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
