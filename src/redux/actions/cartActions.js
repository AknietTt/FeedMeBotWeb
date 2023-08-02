// src/redux/actions/cartActions.js

// Функция добавления товара в корзину
export const addToCart = (food) => {
  return {
    type: 'ADD_TO_CART',
    payload: food,
  };
};

// Функция увеличения количества товара в корзине
export const increaseQuantity = (itemId) => {
  return {
    type: 'INCREASE_QUANTITY',
    payload: itemId,
  };
};

// Функция уменьшения количества товара в корзине
export const decreaseQuantity = (itemId) => {
  return {
    type: 'DECREASE_QUANTITY',
    payload: itemId,
  };
};

// Функция удаления товара из корзины
export const removeFromCart = (itemId) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: itemId,
  };
};

export const clearCart = ()=>{
  return {
    type: 'CLEARE_CART'
  };
}
