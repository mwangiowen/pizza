import React, { useState } from 'react';

const AddRestaurantPizza = () => {
  const [formData, setFormData] = useState({
    price: '',
    pizza_id: '',
    restaurant_id: '',
  });
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/restaurant_pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          setError('Validation errors occurred. Please check your input.');
          setConfirmation('');
        } else {
          setConfirmation('Restaurant Pizza added successfully!');
          setError('');
          // Clear input fields
          setFormData({ price: '', pizza_id: '', restaurant_id: '' });
        }
      })
      .catch(error => {
        console.error('Error adding restaurant pizza:', error);
        setError('An error occurred while adding the restaurant pizza.');
        setConfirmation('');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Restaurant Pizza</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border py-2 px-4 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pizza ID:</label>
          <input
            type="number"
            name="pizza_id"
            value={formData.pizza_id}
            onChange={handleChange}
            className="border py-2 px-4 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Restaurant ID:</label>
          <input
            type="number"
            name="restaurant_id"
            value={formData.restaurant_id}
            onChange={handleChange}
            className="border py-2 px-4 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 cursor-pointer"
        >
          Add Restaurant Pizza
        </button>
      </form>
      {confirmation && <p className="mt-4 text-green-600">{confirmation}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default AddRestaurantPizza;
