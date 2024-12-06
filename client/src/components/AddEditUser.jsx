import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddEditUser = ({ fetchUsers }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (id) {
      axios.get(`/api/users/${id}`).then(response => setUser(response.data.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`/api/users/${id}`, user);
    } else {
      await axios.post('/api/users', user);
    }
    fetchUsers();
    navigate('/users');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} placeholder="Name" required />
      <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" required />
      <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="Password" required />
      <button type="submit">Save</button>
    </form>
  );
};

export default AddEditUser;
