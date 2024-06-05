import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { FaUtensils, FaTrash } from "react-icons/fa"; // Added FaTrash icon
import { MdPlace, MdRemoveCircle } from "react-icons/md";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/restaurants/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Restaurant details not found");
        }
        return response.json();
      })
      .then((data) => setRestaurantDetails(data))
      .catch((error) => {
        setError(error.message);
        console.error("Error fetching restaurant details:", error);
      });
  }, [id]);

  const removePizza = (pizzaId) => {
    // Make a DELETE request to the API to remove the pizza
    fetch(`/restaurants/${id}/pizzas/${pizzaId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Pizza removed successfully:', data);
        // Update the state to reflect the changes (remove the deleted pizza)
        setRestaurantDetails(prevState => {
          const updatedPizzas = prevState.pizzas.filter(pizza => pizza.id !== pizzaId);
          return { ...prevState, pizzas: updatedPizzas };
        });
      })
      .catch(error => console.error('Error removing pizza:', error));
  };

  const removeRestaurant = () => {
    // Make a DELETE request to the API to remove the restaurant
    fetch(`/restaurants/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Restaurant removed successfully:', data);
        // Redirect to the list of restaurants or perform any other necessary action
        window.location.href = '/restaurants';
      })
      .catch(error => console.error('Error removing restaurant:', error));
  };

  if (error) {
    return (
      <div className="text-red-500">
        <p>Error: {error}</p>
        <p>Please refresh the page or try again later.</p>
      </div>
    );
  }

  if (!restaurantDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="-z-50">
      <h1 className="text-4xl">More details</h1>
      <div className="flex mt-6 justify-center w-full gap-8 p-4 h-[50%] items-center bg-slate-300">
        <div className="side1 flex flex-col items-center">
          <h2 className="text-4xl text-red-500 font-extralight pb-2">
            {restaurantDetails.name}
          </h2>
          <p className="text-gray-600 font-thin mb-2">
            {restaurantDetails.address}
          </p>
          <div className="flex items-center gap-2">
            <MdPlace />
            <p className="text-gray-600 font-thin mb-2">
              {restaurantDetails.address}
            </p>
            {restaurantDetails.rating !== undefined && (
              <span className="text-yellow-500">
                {Array.from({ length: restaurantDetails.rating }, (_, index) => (
                  <FaStar key={index} />
                ))}
                {Array.from(
                  { length: 5 - restaurantDetails.rating },
                  (_, index) => (
                    <FaRegStar key={index} />
                  )
                )}
              </span>
            )}
            {restaurantDetails.rating !== undefined && (
              <span className="text-gray-600 ml-2">
                ({restaurantDetails.rating.toFixed(1)})
              </span>
            )}
            <div className="flex items-center flex-row-reverse gap-3 border-b-black border-1 text-red-500">
              <h3>Reserve</h3>
              <FaUtensils />
            </div>
          </div>
        </div>
        <div className="side2 flex flex-col gap-8">
          <h3 className="text-xl font-semibold mb-2">Pizzas</h3>
          {restaurantDetails.pizzas && restaurantDetails.pizzas.length > 0 ? (
            <ul>
              {restaurantDetails.pizzas.map((pizza) => (
                <li key={pizza.id} className="flex items-center">
                  <span>
                    <strong>{pizza.name}</strong>: {pizza.ingredients}
                  </span>
                  <button
                    onClick={() => removePizza(pizza.id)}
                    className="text-red-500 ml-2 hover:text-red-700"
                  >
                    <MdRemoveCircle />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pizzas found.</p>
          )}
          {/* Remove Restaurant button with FaTrash icon */}
          <button
            onClick={removeRestaurant}
            className="text-red-500 hover:text-red-700 flex items-center"
          >
            <FaTrash className="mr-2" />
            Remove Restaurant
          </button>
          <button
            className="text-blue-500 flex items-center"
            onClick={() => window.history.back()}
          >
            <BsArrowLeft /> Back to Restaurants
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
