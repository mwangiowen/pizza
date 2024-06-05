import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoPizzaOutline } from 'react-icons/io5';

const pizzaImage = "https://source.unsplash.com/800x600/?pizza";

const LoginForm = () => {
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        // User exists and login successful, use navigate to redirect
        navigate("/home");
        toast.success("Login successful!");
      } else {
        // User does not exist or login failed, display the error message
        toast.error(data.errors[0] || "Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-[%]">
      <div className="py-3">
        <div className="flex flex-col items-center justify-center">
          <IoPizzaOutline className="black font-bold text-black text-4xl" /> {/* Title */}
          <h1 className="text-3xl font-bold text-black">Deluxe Pizza</h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-1/2 h-64 md:h-auto bg-cover bg-center rounded-tl-xl md:rounded-bl-xl md:rounded-tr-none" style={{ backgroundImage: `url(${pizzaImage})` }}></div>
        <div className="md:w-1/2 flex items-center justify-center rounded-xl p-4 md:p-10 bg-gray-100 rounded-br-xl md:rounded-br-none md:rounded-bl-xl">
          <div className="w-full max-w-md">
            <h2 className="text-3xl mb-5">Login</h2>
            <ToastContainer />
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginFormData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginFormData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="mt-4">
              Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
