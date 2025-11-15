// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Loader from "./components/Loader";

const API_URL = "http://localhost:5000/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL);
      setProducts(data);
    } catch (error) {
      alert("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create or update product
  const handleFormSubmit = async (product) => {
    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/${editingProduct.id}`, product);
        alert("Product updated successfully.");
      } else {
        await axios.post(API_URL, product);
        alert("Product created successfully.");
      }
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      alert("Failed to save product.");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Product deleted.");
        fetchProducts();
      } catch (error) {
        alert("Failed to delete product.");
      }
    }
  };

  // Edit product button click
  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    setEditingProduct(product);
    setShowForm(true);
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4 text-center">Product Management</h1>

      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="mb-3">
          Add Product
        </Button>
      )}

      {loading ? (
        <Loader />
      ) : showForm ? (
        <ProductForm
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          product={editingProduct}
        />
      ) : (
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Container>
  );
}

export default App;
