// src/components/Menu/Foods/Foods.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/cartActions";
import styles from "./Foods.module.css";
import { setFoods } from "../../../redux/actions/foodActions";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { ShoppingCartOutlined } from "@ant-design/icons";

function Foods() {
  const { id, categoryid } = useParams();
  const foods = useSelector((state) => state.foods);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(
          `https://localhost:7242/api/Food/get/${id}/${categoryid}`
        );
        const data = await response.json();
        dispatch(setFoods(data));
      } catch (error) {
        console.error("Ошибка при получении еды:", error);
      }
    };

    fetchFoods();
  }, [id, categoryid, dispatch]);

  return (
    <div className={styles.foodsList}>
      {foods.map((food) => (
        <Card
          key={food.id}
          className={styles.foodCard}
          cover={
            <img  alt={food.name}  src={food.image || "https://klike.net/uploads/posts/2023-02/1676525022_3-144.jpg"} style={{height:"150px", objectFit:"cover"}} />
          }
        >
          <Meta title={food.name} description={food.description} style={{padding:"0px"}} />
          <Button
                  
            icon={<ShoppingCartOutlined />}
            type="primary"
            onClick={() => dispatch(addToCart(food))}
            style={{marginTop:"7px"}}
            
          >
            {food.price} тг
          </Button>
        </Card>
      ))}
      <div style={{padding:"90px"}}>
      </div>
    </div>
  );
}

export default Foods;
