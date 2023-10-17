import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Form, Typography } from "antd";
import styles from "./Payment.module.css";
import { useNavigate, useParams } from "react-router";
import { clearCart } from "../../redux/actions/cartActions";

const { Title } = Typography;

function Payment({id}) {
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(id);
  // Состояние для хранения данных пользователя
  const [formData, setFormData] = useState({
    username: "", // Обновляем имя поля
    firstName: "", // Обновляем имя поля
    number: "", // Обновляем имя поля
    address: "", // Обновляем имя поля
  });

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleOrder = () => {
    const apiUrl = "https://localhost:7242/api/Order/add";

    const orderItems = cartItems.map((item) => ({
      foodId: item.id,
      count: item.quantity,
    }));

    const orderData = {
      customer: {
        username: formData.username, // Обновляем имя поля
        firstName: formData.name, // Обновляем имя поля
        number: formData.number, // Обновляем имя поля
        userId: 0, // Если у вас есть информация о пользователе, то укажите его ID
        address: formData.address, // Обновляем имя поля
      },
      items: orderItems,
      totalPrice: calculateTotalPrice(),
    };

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
      <Title level={2}>Payment</Title>
      <Form className={styles.formContainer}>
        <Form.Item label="Ник из телеграмма" name="username" rules={[{ message: "Введите вашe ник из телеграмма если оно есть" }]}>
          <Input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        </Form.Item>
        <Form.Item label="Имя" name="name" rules={[{ required: true, message: "Введите ваше имя" }]}>
          <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </Form.Item>
        <Form.Item label="Номер" name="number" rules={[{ required: true, message: "Введите ваш номер" }]}>
          <Input value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} />
        </Form.Item>
        <Form.Item label="Адрес" name="address" rules={[{ required: true, message: "Введите ваш адрес" }]}>
          <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
        </Form.Item>
        <Form.Item>
          <Title level={4}>Общая сумма заказа: {calculateTotalPrice()} тенге</Title>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleOrder}>
            Заказать
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.orderDetails}>
        <Title level={3}>Детали заказа:</Title>
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
