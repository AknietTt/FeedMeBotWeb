
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/actions/cartActions";
import { Button, List, Divider, Collapse } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

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

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div
      className={styles.cartContainer}
      style={{ position: "fixed", bottom: 0, right: 0, maxHeight: "80vh" }}
    >
      <h3>Корзина: сумма {calculateTotalPrice()} тг</h3>
      <Link to={"/payment"}>
        <Button type="primary">Оплатить</Button>
      </Link>

      {(
        <div className={styles.cartPanel}>
          <Collapse defaultActiveKey={[]} ghost>
            <Panel header="Детали заказа" key="1">
              <div
                style={{ maxHeight: "calc(80vh - 120px)", overflowY: "auto" }}
              >
                {cartItems.length === 0 ? (
                  <p>Корзина пустая.</p>
                ) : (
                  <div>
                    <List
                      dataSource={cartItems}
                      renderItem={(item) => (
                        <List.Item key={item.id} className={styles.cartItem}>
                          <div>
                            <p className={styles.itemName}>{item.name}</p>
                            <p className={styles.itemPrice}>
                              Цена: {item.price}
                            </p>
                          </div>
                          <div className={styles.quantityContainer}>
                            <Button
                              onClick={() => handleDecreaseQuantity(item.id)}
                            >
                              -
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              onClick={() => handleIncreaseQuantity(item.id)}
                            >
                              +
                            </Button>
                            <Button
                              icon={<CloseOutlined />}
                              onClick={() => handleRemoveItem(item.id)}
                              className={styles.removeButton}
                              style={{ padding: "0px 15px 0px 8px" }}
                            />
                          </div>
                        </List.Item>
                      )}
                    />
                    <Divider />
                  </div>
                )}
              </div>
            </Panel>
          </Collapse>
        </div>
      )}
    </div>
  );
}

export default Cart;
