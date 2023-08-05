import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Form, Typography } from "antd";
import styles from "./Payment.module.css";
import { useNavigate } from "react-router";
import { clearCart } from "../../redux/actions/cartActions";

const { Title } = Typography;

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
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOrder = () => {
    // ... (остальной код обработки заказа)
    const apiUrl = "https://localhost:7242/api/Order/add/order";

    const orderItems = cartItems.map((item) => ({
      food: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        menuId: item.menuId,
        categoryId: item.categoryId,
        image: "", // Здесь вы можете указать ссылку на изображение продукта, если имеется
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
        <Form.Item label="Имя" name="name" rules={[{ required: true, message: "Введите ваше имя" }]}>
          <Input value={formData.name} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Номер" name="number" rules={[{ required: true, message: "Введите ваш номер" }]}>
          <Input value={formData.number} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Адрес" name="address" rules={[{ required: true, message: "Введите ваш адрес" }]}>
          <Input value={formData.address} onChange={handleInputChange} />
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
