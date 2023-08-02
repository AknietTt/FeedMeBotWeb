import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Restaurants.module.css';

export default function Restaurants() {
  const { id } = useParams();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`https://localhost:7242/api/Restaurant/get/сity/${id}`);
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Ошибка при получении ресторанов:", error);
      }
    };

    fetchRestaurants();
  }, [id]);

  return (
    <div className={styles.container}>
      <h1>Рестораны </h1>
      <div className={styles.restaurantsList}>
        {restaurants.map((restaurant) => (
          <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`} className={styles.link}>
            <div className={styles.restaurantCard}>
              <h2>{restaurant.name}</h2>
              <img src={restaurant.image} alt={restaurant.name} />
              <p>{restaurant.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
