import React from 'react';

function Restaurant({ id, name, image, desc }) {
  const handleClick = () => {
    window.location.href = `/restaurant/${id}`;
  };

  return (
    <div className="restaurant" onClick={handleClick}>
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>{desc}</p>
    </div>
  );
}

export default Restaurant;