const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  getInventoryStats,
  getLowStockAlerts
} = require('../controllers/inventoryController');
const { protect, authorize } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validation');

const router = express.Router();

router.use(protect); // All routes are protected

router
  .route('/')
  .get(getProducts)
  .post(validateProduct, createProduct);

router.get('/stats', getInventoryStats);
router.get('/alerts', getLowStockAlerts);

router
  .route('/:id')
  .get(getProduct)
  .put(validateProduct, updateProduct)
  .delete(authorize('Admin', 'Manager'), deleteProduct);

router.put('/:id/stock', updateStock);

module.exports = router;