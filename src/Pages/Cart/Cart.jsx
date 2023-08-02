// src/components/Cart/Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/actions/cartActions";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handlePay = () => {
    // Implement your logic for payment processing here.
    // You can redirect to a payment page or handle payment-related actions.
    // For this example, we'll redirect to the '/payment' route.
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className={styles.cartContainer}>
      <h3>Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className={styles.cartItem} key={item.id}>
              <p>{item.name}</p>
              <p>Price: {item.price}</p>
              <div>
                <button onClick={() => handleDecreaseQuantity(item.id)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(item.id)}>
                  +
                </button>
              </div>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))}
          {cartItems.some((item) => item.quantity >= 1) && (
            <Link to={"/payment"}>
              <button >Pay</button>
            </Link>
          )}
          <p className={styles.totalPrice}>
            Total Price: {calculateTotalPrice()}
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
