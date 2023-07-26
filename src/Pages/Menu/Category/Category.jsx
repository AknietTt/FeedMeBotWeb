import React from "react";
import { useParams } from "react-router";
import categories from "../../../Data/data";

export const Category = () => {
  const { id } = useParams();
  
  const restaurantCategories = categories.find(
    (category) => category.restaurantId === parseInt(id, 10)
  );

  if (!restaurantCategories) {
    return <div>Ресторан не найден</div>;
  }
  return (
    <div>
      <h2>Категории ресторана</h2>
      <h3>Категории:</h3>
      <ul>
        {restaurantCategories.category.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};
