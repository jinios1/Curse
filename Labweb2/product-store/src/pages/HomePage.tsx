import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductList from '../components/ProductList';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Home Page</h1>
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;
