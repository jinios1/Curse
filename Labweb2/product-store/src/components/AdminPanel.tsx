import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AdminPanel: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const token = useSelector((state: RootState) => state.auth.token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const product = { title, price, description, category, image };
      await axios.post('http://localhost:5000/products', product, {
        headers: { Authorization: token },
      });
      alert('Product added successfully');
    } catch (error) {
      alert('Failed to add product');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Image URL:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminPanel;
