import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cart from "../../Cart/Cart";

function Foods({ onAddToCart , cartItems, incrementQuantity,decrementQuantity }) {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const apiUrl = `https://localhost:7242/api/Food/get/Food/${id}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setFoods(data); // Сохраняем полученные данные в состояние
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, [id]);

  return (
    <div>
      <h1>Foods</h1>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            <p>Name: {food.name}</p>
            <p>Description: {food.description}</p>
            <p>Price: {food.price}</p>
            <button onClick={() => onAddToCart(food, 1)}>Добавить в корзину</button>
          </li>
        ))}
      </ul>
      <Cart cartItems={cartItems} onIncrement={incrementQuantity} onDecrement={decrementQuantity} />
    </div>
  );
}

export default Foods;
