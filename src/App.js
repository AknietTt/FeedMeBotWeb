import "./App.css";

import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Cities from "./Pages/Menu/Cities/Cities";
import Category from "./Pages/Menu/Category/Category";
import Restaurants from "./Pages/Restaurants/Restaurants";
import Foods from "./Pages/Menu/Foods/Foods";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (food, quantity) => {
    const existingItem = cartItems.find((item) => item.id === food.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      setCartItems([...cartItems]);
    } else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...food, quantity },
      ]);
    }
  };

  const removeFromCart = (food) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== food.id)
    );
  };

  const incrementQuantity = (food) => {
    debugger;
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === food.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const decrementQuantity = (food) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === food.id) {
        const updatedQuantity = item.quantity - 1;
        if (updatedQuantity === 0) {
          removeFromCart(item);
        }
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Cities />} />
        <Route path="/cities/:id" element={<Restaurants />} />
        <Route
          path="/restaurant/:id"
          element={
            <Category
              cartItems={cartItems}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
            />
          }
        />
        <Route
          path="/category/:id"
          element={
            <Foods
              cartItems={cartItems}
              onAddToCart={addToCart}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
