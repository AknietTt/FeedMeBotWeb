import "./App.css";

import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Restaurant from "./Pages/Restaurant/Restaurant";
import Cities from "./Pages/Menu/Cities/Cities";
import Category from "./Pages/Menu/Category/Category";
import Restaurants from "./Pages/Restaurants/Restaurants";
import Foods from "./Pages/Menu/Foods/Foods";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Cities />} />
        <Route path="/cities/:id" element = {<Restaurants/>} />
        <Route path="/restaurant/:id" element={<Category />} />
        <Route path="/category/:id" element={<Foods/>} />"
      </Routes>
    </div>
  );
}

export default App;
