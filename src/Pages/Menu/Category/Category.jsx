import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Cart from "../../Cart/Cart";

function Category({cartItems , incrementQuantity, decrementQuantity  }) {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  
  useEffect(() => {
    const apiUrl = `https://localhost:7242/api/Category/get/Restaurant/${id}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setCategories(data); // Сохраняем полученные данные в состояние
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, [id]);

  return (
    <div>
      <h1>Category</h1>
      <ul>
        {categories.map(category => (
          // Используем поле id в URL и тексте ссылки
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <Cart cartItems={cartItems} onIncrement={incrementQuantity} onDecrement={decrementQuantity} />
    </div>
  );
}

export default Category;
