// src/components/ProductList.js
import React from "react";
import { Table, Button } from "react-bootstrap";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#ID</th>
          <th>Name</th>
          <th>Price ($)</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">
              No products found.
            </td>
          </tr>
        ) : (
          products.map(({ id, name, price, description }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{price.toFixed(2)}</td>
              <td>{description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default ProductList;
