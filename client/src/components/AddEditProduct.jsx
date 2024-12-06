import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddEditProduct = ({ fetchProducts }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({ name: '', description: '', price: 0 });

  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`).then(response => setProduct(response.data.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`/api/products/${id}`, product);
    } else {
      await axios.post('/api/products', product);
    }
    fetchProducts();
    navigate('/products');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} placeholder="Name" required />
      <textarea value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} placeholder="Description" required />
      <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} placeholder="Price" required />
      <button type="submit">Save</button>
    </form>
  );
};

export default AddEditProduct;
