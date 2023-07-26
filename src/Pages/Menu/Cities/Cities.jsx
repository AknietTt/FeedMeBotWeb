import React, { useState, useEffect } from 'react';

export default function Cities() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Функция для выполнения асинхронного запроса к API и получения списка городов
    const fetchCities = async () => {
      try {
        const response = await fetch('https://localhost:7242/api/City/getAll');
        const data = await response.json();
        console.log(data);
        setCities(data); // Устанавливаем полученные данные в состояние
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchCities(); // Вызываем функцию запроса при загрузке компонента
  }, []);

  return (
    <div>
      <h1>Cities</h1>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>{city.name}</li>
        ))}
      </ul>
    </div>
  );
}
