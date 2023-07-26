import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Импортируем компонент Link

export default function Cities() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://localhost:7242/api/City/getAll');
        const data = await response.json();
        setCities(data); 
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchCities(); 
  }, []);

  return (
    <div>
      <h1>Cities</h1>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>
            <Link to={`/cities/${city.id}`}>{city.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
