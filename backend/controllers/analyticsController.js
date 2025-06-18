// controllers/analyticsController.js

const Product = require('../models/Product');
const Order = require('../models/Order');
const Supplier = require('../models/Supplier');

// Get inventory statistics
exports.getInventoryStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalQuantity = await Product.aggregate([
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]);

    res.status(200).json({
      totalProducts,
      totalQuantity: totalQuantity[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inventory stats", error });
  }
};

// Get order statistics
exports.getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, revenue: { $sum: "$totalAmount" } } }
    ]);

    res.status(200).json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.revenue || 0
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order stats", error });
  }
};

// Get supplier statistics
exports.getSupplierStats = async (req, res) => {
  try {
    const totalSuppliers = await Supplier.countDocuments();
    res.status(200).json({ totalSuppliers });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch supplier stats", error });
  }
};
