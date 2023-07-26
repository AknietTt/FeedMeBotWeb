import "./App.css";

import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Restaurants from "./Pages/Restaurants/Restaurants";
import Restaurant from "./Pages/Restaurant/Restaurant";
import { useParams } from "react-router-dom";
import { Category } from "./Pages/Menu/Category/Category";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<Category/>} />
      </Routes>
    </div>
  );
}

export default App;
