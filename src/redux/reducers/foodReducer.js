// src/redux/reducers/foodReducer.js
const foodReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FOODS':
      return action.payload;
    default:
      return state;
  }
};

export default foodReducer;
