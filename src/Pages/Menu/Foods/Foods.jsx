// src/components/Menu/Foods/Foods.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/actions/cartActions';
import styles from "./Foods.module.css";
import { setFoods } from "../../../redux/actions/foodActions";

function Foods() {
  const { id, categoryid } = useParams();
  const foods = useSelector((state) => state.foods);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(
          `https://localhost:7242/api/Food/get/${id}/${categoryid}`
        );
        const data = await response.json();
        dispatch(setFoods(data));
      } catch (error) {
        console.error("Ошибка при получении еды:", error);
      }
    };

    fetchFoods();
  }, [id, categoryid, dispatch]);

  return (
    <div className={styles.foodsList}>
      {foods.map((food) => (
        <div key={food.id} className={styles.foodCard}>
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p>Цена: {food.price} тенге.</p>
          {/* Вместо передачи функции addToCart, используем действие (action) для добавления в корзину */}
          <button onClick={() => dispatch(addToCart(food))}>Добавить в корзину</button>
        </div>
      ))}
    </div>
  );
}

export default Foods;
