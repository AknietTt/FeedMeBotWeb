import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./Cities.module.css";

const { Option } = Select;

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://localhost:7242/api/City/getAll");
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchCities();
  }, []);

  function handleCityChange(value) {
    setSelectedCity(value);
  }

  function redirectToPage() {
    if (selectedCity) {
      navigate(`/restaurants/${selectedCity}`);
    }
  }
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Poppins:wght@600&family=Rubik:wght@600&display=swap"
    rel="stylesheet"
  ></link>;
  
  return (
    <div className={styles.container}>
    <label className={styles.label}>Выберите город:</label>
    <Select
      className={styles.select}
      placeholder="Выберите город"
      onChange={handleCityChange}
      value={selectedCity}
    >
      {cities.map((city) => (
        <Option key={city.id} value={city.id}>
          {city.name}
        </Option>
      ))}
    </Select>

    <Button className={styles.button} type="primary" size="large" onClick={redirectToPage}>
      Выбрать
    </Button>
  </div>
  );
}
