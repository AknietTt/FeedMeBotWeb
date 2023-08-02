import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Category.module.css";

function Category() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`https://localhost:7242/api/Category/get/Restaurant/${id}`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Ошибка при получении категорий:", error);
      }
    };

    fetchCategories();
  }, [id]);

  return (
    <div className={styles.container}>
      <h1>Категории ресторана с id: {id}</h1>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/restaurant/${id}/category/${category.id}`} className={styles.link}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
