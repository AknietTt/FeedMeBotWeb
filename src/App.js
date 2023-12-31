import "./App.css";

import { Routes, useParams } from "react-router-dom";
import { Route } from "react-router-dom";
import Cities from "./Pages/Cities/Cities";
import Restaurants from "./Pages/Restaurants/Restaurants";
import Purchase from "./Pages/Purchase/Purchase";
import Payment from "./Pages/Payment/Payment";
import { Provider } from "react-redux";
import store from "./redux/store";
import NavigationArrows from "./Pages/NavigationArrows/NavigationArrows";

function App() {
  const {id} = useParams();
  console.log(id);
  return (
    <div>
      <NavigationArrows/>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Cities />} />
          <Route path="/restaurants/:cityId" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<Purchase />} />
          <Route path="/restaurant/:id/*" element={<Purchase />} />
          <Route path=":restaurnatId/payment" element={<Payment />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
