// src/components/Purchase.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router';
import Category from '../Menu/Category/Category';
import Foods from '../Menu/Foods/Foods';
import Cart from '../Cart/Cart'
function Purchase() {
  const { categoryid } = useParams();
  const cartItems = useSelector((state) => state.cart);

  return (
    <div>
      <h2>Purchase</h2>
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path={`category/:categoryid`} element={<Foods />} />
      </Routes>
      <Cart cartItems={cartItems} />
    </div>
  );
}

export default Purchase;
