import React from 'react'

function Cart({ cartItems, onIncrement, onDecrement }) {
    return (
      <div>
        <h2>Корзина</h2>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <p>{item.name}</p>
              <p>{item.price} руб.</p>
              <div>
                <button onClick={() => onDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrement(item)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
export default Cart