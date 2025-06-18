const express = require('express');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validation');

const router = express.Router();

router.use(protect); // All routes are protected

router
  .route('/')
  .get(getOrders)
  .post(validateOrder, createOrder);

router.get('/stats', getOrderStats);

router
  .route('/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(authorize('Admin', 'Manager'), deleteOrder);

router.put('/:id/status', updateOrderStatus);

module.exports = router;    