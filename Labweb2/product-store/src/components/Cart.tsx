import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface CartProps {
  items: Product[];
}

const Cart: React.FC<CartProps> = ({ items }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${items.reduce((total, item) => total + item.price, 0)}</p>
    </div>
  );
};

export default Cart;
