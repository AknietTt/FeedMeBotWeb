// src/redux/actions/foodActions.js
export const setFoods = (foods) => {
  return {
    type: 'SET_FOODS',
    payload: foods,
  };
};

// src/redux/actions/cartActions.js
export const addToCart = (food) => {
  return {
    type: 'ADD_TO_CART',
    payload: food,
  };
};

export const increaseQuantity = (itemId) => {
  return {
    type: 'INCREASE_QUANTITY',
    payload: itemId,
  };
};

export const decreaseQuantity = (itemId) => {
  return {
    type: 'DECREASE_QUANTITY',
    payload: itemId,
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: itemId,
  };
};
