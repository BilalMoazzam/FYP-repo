// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose'); // Add this line

// GET /api/products
// routes/productRoutes.js



// In your productRoutes.js
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean();
    const formattedProducts = products.map(p => ({
      id: p._id,
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description,
      sizes: p.size,
      colors: p.color,
      stock: p.stock,
      imageUrl: p.image,
      status: p.stock > 0 ? 'In Stock' : 'Out of Stock'
    }));
    res.json(formattedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// In productRoutes.js
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const products = await Product.find().skip(skip).limit(limit);
  console.log(limit)
  const total = await Product.countDocuments();
  
  res.json({
    data: products,
    meta: { page, limit, total }
  });
});
module.exports = router;
