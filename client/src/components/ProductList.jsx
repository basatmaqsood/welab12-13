import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = ({ products, deleteProduct }) => {
  const navigate = useNavigate();

  const deleteFun = (id)=>{
    console.log("trying to delete 1")
    deleteProduct(id);
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>Product List</h2>
        <Link to="/add-product" className="btn btn-primary">Add Product</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => navigate(`/edit-product/${product._id}`)}>Edit</button>
                <button onClick={() => deleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
