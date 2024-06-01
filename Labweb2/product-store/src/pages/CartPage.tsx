import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Cart from '../components/Cart';

const CartPage: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <div>
      <h1>Cart Page</h1>
      <Cart items={items} />
    </div>
  );
};

export default CartPage;
