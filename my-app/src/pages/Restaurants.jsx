import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { FaUtensils } from 'react-icons/fa';
import { MdPlace } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/restaurants')
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='mt-6  '>
      <div className=''>
        <div>
          <h2 className='text-4xl text-red-500 font-extralight pb-2'>View Restaurants</h2>
          <BsArrowRight className='font-bold text-4xl text-red-600' />
        </div>
        {/* Render the list of restaurants */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4  -z-50">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white z-50 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                className="w-full h-32 object-cover object-center"
                src={`https://source.unsplash.com/800x600/?restaurant,${restaurant.name}`}
                alt={`Restaurant ${restaurant.name}`}
              />

              <div className="p-4 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
               
                <div className="flex items-center gap-2">
                  <MdPlace />
                  <p className="text-gray-600 font-thin mb-2">{restaurant.address}</p>

                  {restaurant.rating !== undefined && (
                    <span className="text-yellow-500">
                      {Array.from({ length: restaurant.rating }, (_, index) => (
                        <FaStar key={index} />
                      ))}
                      {Array.from({ length: 5 - restaurant.rating }, (_, index) => (
                        <FaRegStar key={index} />
                      ))}
                    </span>
                  )}
                  {restaurant.rating !== undefined && (
                    <span className="text-gray-600 ml-2">({restaurant.rating.toFixed(1)})</span>
                  )}
                  <div className='flex items-center flex-row-reverse gap-3 border-b-black border-1 text-red-500'>
                    <h3>Reserve  </h3>
                    <FaUtensils />
                  </div>
                </div>

                {/* Use Link to navigate to the details page */}
                <Link to={`/restaurants/${restaurant.id}`} className="show-btn cursor-pointer">
                  <h3 className='text-blue-500'>Show More</h3>
                  <BsArrowRight/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
