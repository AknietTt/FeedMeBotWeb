import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Restaurant from '../Restaurant/Restaurant';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://localhost:7242/api/Restaurant/getAll';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setRestaurants(data); 
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  return (
    <div>
      <div className="restaurant-container">
        <h1>Restaurants</h1>
        <ul>
          {restaurants.map(restaurant => (
            <li key={restaurant.id}>
              <Link to={`/restaurant/${restaurant.id}`}>
                <Restaurant restaurantId={restaurant.id} name = {restaurant.name}/>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
