// backend/routes/products.js

const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE product
router.post("/", async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
      [name, price, description]
    );
    res.status(201).json({ id: result.insertId, name, price, description });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ all products
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ one product by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?",
      [name, price, description, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json({ id, name, price, description });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM products WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
