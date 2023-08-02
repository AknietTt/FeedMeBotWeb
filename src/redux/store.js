// src/redux/store.js
import { createStore, combineReducers } from 'redux';
import foodReducer from './reducers/foodReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  foods: foodReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
