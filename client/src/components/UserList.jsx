import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserList = ({ users, deleteUser }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>User List</h2>
        <Link to="/add-user" className="btn btn-primary">Add User</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => navigate(`/edit-user/${user._id}`)}>Edit</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
