const Product = require('../models/Product');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');

// @desc    Get all products
// @route   GET /api/inventory
// @access  Private
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    
    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Filter by supplier
    if (req.query.supplier) {
      query.supplier = req.query.supplier;
    }
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Filter by stock status
    if (req.query.stockStatus) {
      switch (req.query.stockStatus) {
        case 'low':
          query.$expr = { $lte: ['$stock.current', '$stock.minimum'] };
          break;
        case 'out':
          query['stock.current'] = 0;
          break;
        case 'overstock':
          query.$expr = { $gte: ['$stock.current', '$stock.maximum'] };
          break;
      }
    }
    
    // Search by name, SKU, or description
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    const products = await Product.find(query)
      .populate('category', 'name')
      .populate('supplier', 'name code')
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single product
// @route   GET /api/inventory/:id
// @access  Private
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name description')
      .populate('supplier', 'name code contact')
      .populate('createdBy', 'firstName lastName')
      .populate('updatedBy', 'firstName lastName');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new product
// @route   POST /api/inventory
// @access  Private
const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      createdBy: req.user.id
    };

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: productData.sku });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }

    const product = await Product.create(productData);
    
    await product.populate([
      { path: 'category', select: 'name' },
      { path: 'supplier', select: 'name code' },
      { path: 'createdBy', select: 'firstName lastName' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update product
// @route   PUT /api/inventory/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update product
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user.id },
      { new: true, runValidators: true }
    ).populate([
      { path: 'category', select: 'name' },
      { path: 'supplier', select: 'name code' },
      { path: 'updatedBy', select: 'firstName lastName' }
    ]);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/inventory/:id
// @access  Private (Admin/Manager)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update product stock
// @route   PUT /api/inventory/:id/stock
// @access  Private
const updateStock = async (req, res) => {
  try {
    const { quantity, operation } = req.body; // operation: 'add' or 'subtract'
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (operation === 'add') {
      product.stock.current += quantity;
    } else if (operation === 'subtract') {
      if (product.stock.current < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock'
        });
      }
      product.stock.current -= quantity;
    } else {
      product.stock.current = quantity;
    }

    product.updatedBy = req.user.id;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      data: {
        productId: product._id,
        sku: product.sku,
        name: product.name,
        currentStock: product.stock.current,
        stockStatus: product.stockStatus
      }
    });
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get inventory statistics
// @route   GET /api/inventory/stats
// @access  Private
const getInventoryStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ status: 'Active' });
    const lowStockProducts = await Product.countDocuments({
      $expr: { $lte: ['$stock.current', '$stock.minimum'] }
    });
    const outOfStockProducts = await Product.countDocuments({ 'stock.current': 0 });
    
    const totalValue = await Product.aggregate([
      { $match: { status: 'Active' } },
      { $group: { _id: null, total: { $sum: { $multiply: ['$stock.current', '$price.cost'] } } } }
    ]);

    const categoryStats = await Product.aggregate([
      { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'categoryInfo' } },
      { $unwind: '$categoryInfo' },
      { $group: { _id: '$categoryInfo.name', count: { $sum: 1 }, totalValue: { $sum: { $multiply: ['$stock.current', '$price.cost'] } } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        activeProducts,
        lowStockProducts,
        outOfStockProducts,
        totalValue: totalValue[0]?.total || 0,
        categoryStats
      }
    });
  } catch (error) {
    console.error('Get inventory stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get low stock alerts
// @route   GET /api/inventory/alerts
// @access  Private
const getLowStockAlerts = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      $expr: { $lte: ['$stock.current', '$stock.minimum'] },
      status: 'Active'
    })
    .populate('category', 'name')
    .populate('supplier', 'name contact')
    .select('name sku stock category supplier')
    .sort({ 'stock.current': 1 });

    res.status(200).json({
      success: true,
      count: lowStockProducts.length,
      data: lowStockProducts
    });
  } catch (error) {
    console.error('Get low stock alerts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  getInventoryStats,
  getLowStockAlerts
};