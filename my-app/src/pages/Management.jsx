// src/pages/Management.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MenuManagement = () => {
  const [pizzas, setPizzas] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [confirmation, setConfirmation] = useState('');
  const [newRestaurantPizza, setNewRestaurantPizza] = useState({
    price: '',
    pizza_id: '',
    restaurant_id: '',
  });

  useEffect(() => {
    fetch('/pizzas')
      .then((response) => response.json())
      .then((data) => setPizzas(data))
      .catch((error) => console.error('Error fetching pizzas:', error));

    fetch('/restaurants')
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  const addRestaurantPizza = () => {
    fetch('/restaurant_pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRestaurantPizza),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Restaurant Pizza added successfully:', data);
        setNewRestaurantPizza({ price: '', pizza_id: '', restaurant_id: '' });
        setConfirmation('Restaurant Pizza added successfully!');
        setTimeout(() => setConfirmation(''), 3000);
      })
      .catch(error => console.error('Error adding restaurant pizza:', error));
  };

  return (
    <div className="mx-auto max-w-screen-lg p-4">
      <div>
        <h1 className="text-4xl mb-6">Pizza Management</h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {pizzas.map((pizza) => (
              <tr key={pizza.id}>
                <td className="border px-4 py-2">{pizza.id}</td>
                <td className="border px-4 py-2">{pizza.name}</td>
                <td className="border px-4 py-2">{pizza.ingredients}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h1 className="text-4xl mb-6 mt-8">Restaurant Management</h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id}>
                <td className="border px-4 py-2">{restaurant.id}</td>
                <td className="border px-4 py-2">{restaurant.name}</td>
                <td className="border px-4 py-2">{restaurant.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="my-6" />

      <h1 className="text-4xl mb-6">Restaurant Pizza Management</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
        <input
          type="text"
          value={newRestaurantPizza.price}
          onChange={(e) => setNewRestaurantPizza({ ...newRestaurantPizza, price: e.target.value })}
          className="border py-2 px-4 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Pizza ID</label>
        <input
          type="text"
          value={newRestaurantPizza.pizza_id}
          onChange={(e) => setNewRestaurantPizza({ ...newRestaurantPizza, pizza_id: e.target.value })}
          className="border py-2 px-4 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant ID</label>
        <input
          type="text"
          value={newRestaurantPizza.restaurant_id}
          onChange={(e) => setNewRestaurantPizza({ ...newRestaurantPizza, restaurant_id: e.target.value })}
          className="border py-2 px-4 w-full"
        />
      </div>

      <button onClick={addRestaurantPizza} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 cursor-pointer">
        Add Restaurant Pizza
      </button>

      {confirmation && <div className="mb-4 text-green-600">{confirmation}</div>}

    </div>
  );
};

export default MenuManagement;
