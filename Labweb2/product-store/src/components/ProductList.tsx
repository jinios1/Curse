import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <img src={product.image} alt={product.title} width="100" />
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
