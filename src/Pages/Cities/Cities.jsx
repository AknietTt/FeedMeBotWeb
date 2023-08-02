// Import useNavigate instead of useHistory
import { Link, useNavigate } from "react-router-dom";
import styles from "./Cities.module.css";
import { useEffect, useState } from "react";

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

  function handleCityChange(event) {
    setSelectedCity(event.target.value);
  }

  function redirectToPage() {
    if (selectedCity) {
      navigate(`/restaurants/${selectedCity}`);
    }
  }

  return (
    <div className={styles.container}>
      <label>Выберите город:</label>
      <select className={styles.select} onChange={handleCityChange}>
        <option value="">Выберите город</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <button className={styles.button} onClick={redirectToPage}>
        Выбрать
      </button>
    </div>
  );
}
