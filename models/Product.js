// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' },
  size: { type: [String], default: [] },
  color: { type: [String], default: [] },
  stock: { type: Number, default: 0, min: 0 },
  image: { type: String, default: '' }
}, {
  timestamps: true,
  strict: false   // ✅ Allow flexible fields during testing
});


// ✅ FORCE Mongoose to use the 'product' collection (singular!)
module.exports = mongoose.model('Product', productSchema, 'product');
