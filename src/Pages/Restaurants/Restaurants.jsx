import React from "react";
import { Link } from "react-router-dom";
import { restaurants } from "../../Data/data";

import Restaurant from "../Restaurant/Restaurant";


function Restaurants() {
  
  return (
    <div>
      <div className="restaurant-container">
        {restaurants.map((restaurant, index) => (
          <Restaurant
            id={restaurant.id}
            key={index}
            name={restaurant.name}
            image={restaurant.image}
            desc={restaurant.desc}
          />
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
