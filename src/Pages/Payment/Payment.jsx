import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Payment.module.css";
import { useNavigate } from "react-router";
import { clearCart } from "../../redux/actions/cartActions";

function Payment() {
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Состояние для хранения данных пользователя
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    address: "",
  });

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOrder = () => {
    const apiUrl = "https://localhost:7242/api/Order/add/order";

    const orderItems = cartItems.map((item) => ({
      food: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        menuId: item.menuId,
        categoryId: item.categoryId,
      },
      count: item.quantity,
    }));

    const orderData = {
      customer: {
        username: formData.name,
        firstName: formData.name,
        number: formData.number,
        userId: 0, // Если у вас есть информация о пользователе, то укажите его ID
        address: formData.address,
      },
      items: orderItems,
      totalPrice: calculateTotalPrice(),
    };
    
    console.log(orderData);
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Проверяем на пустой ответ
        if (response.status === 204) {
          return null;
        }
        dispatch(clearCart());
        navigate("/");
      })
      .then((data) => {
        if (data) {
          console.log("Order submitted successfully!", data);
        } else {
          console.log("Order submitted successfully!");
        }
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
      });
  };

  return (
    <div className={styles.paymentContainer}>
      <h2>Payment</h2>
      <form>
        <label>
          Имя:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Номер:
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Адрес:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>Общая сумма заказа: {calculateTotalPrice()} тенге</label>
        <button type="button" onClick={handleOrder}>
          Заказать
        </button>
      </form>
      <div className={styles.orderDetails}>
        <h3>Детали заказа:</h3>
        {cartItems.map((item) => (
          <p key={item.id}>
            {item.name}: {item.price}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Payment;
