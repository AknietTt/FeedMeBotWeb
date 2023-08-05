import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material"; // Импортируйте компонент Button из Material-UI
import styles from "./Category.module.css";

function Category() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");

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
      <h1>{name}</h1>
      <div className={styles.categoryList}>
        {categories.map((category) => (
          <Button
            key={category.id}
            component={Link}
            to={`/restaurant/${id}/category/${category.id}`}
            variant="contained"
            color="primary"
            className={styles.link}
            sx={{ width: "200px", marginTop: "10px" } }
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Category;
