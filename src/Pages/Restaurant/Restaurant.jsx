import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Restaurant() {
  const { id } = useParams(); 

  const handleClick = () => {
    const apiUrl = `https://localhost:7242/api/Restaurant/get/City/${id}`;
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        debugger;
        console.log(data);
        window.location.href = `/restaurant/${id}`;
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="restaurant">

    </div>
  );
}
