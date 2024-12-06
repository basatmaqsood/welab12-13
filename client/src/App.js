import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './components/UserList';
import ProductList from './components/ProductList';
import AddEditUser from './components/AddEditUser';
import AddEditProduct from './components/AddEditProduct';

const App = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  axios.defaults.baseURL = 'http://localhost:5000';

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const deleteProduct = async (id) => {
    console.log('trying to delete product')
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <Router>
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl">MERN CRUD App</h1>
          <nav>
            <Link className="mr-4" to="/users">Users</Link>
            <Link to="/products">Products</Link>
          </nav>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/users" element={<UserList users={users} deleteUser={deleteUser} />} />
            <Route path="/products" element={<ProductList products={products} deleteProduct={deleteProduct} />} />
            <Route path="/add-user" element={<AddEditUser fetchUsers={fetchUsers} />} />
            <Route path="/edit-user/:id" element={<AddEditUser fetchUsers={fetchUsers} />} />
            <Route path="/add-product" element={<AddEditProduct fetchProducts={fetchProducts} />} />
            <Route path="/edit-product/:id" element={<AddEditProduct fetchProducts={fetchProducts} />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
