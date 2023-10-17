import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from './Restaurants.module.css';
import { useDispatch } from "react-redux";
import {
  clearCart
} from "../../redux/actions/cartActions";

export default function Restaurants() {
  const { cityId } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`https://localhost:7242/api/Restaurant/get/сity/${cityId}`);
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Ошибка при получении ресторанов:", error);
      }
    };

    fetchRestaurants();
  }, [cityId]);

  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Poppins:wght@600&family=Rubik:wght@600&display=swap"
    rel="stylesheet"
  ></link>;

  return (
    <div className={styles.container}>
    <h1 style={{fontFamily:"Rubik,sans-serif"}}>Рестораны</h1>
    <div className={styles.restaurantsList}>
      {restaurants.map((restaurant) => (
        <Link key={restaurant.id} to={`/restaurant/${restaurant.id}/?name=${restaurant.name}`} className={styles.link}>
          <Card
            hoverable
            className={styles.restaurantCard}
            cover={<img alt={restaurant.name} src={restaurant.image} />}
            size = "default"
          >
            <Meta title={restaurant.name} description={restaurant.description} />
          </Card>
        </Link>
      ))}
    </div>
  </div>
  );
}
