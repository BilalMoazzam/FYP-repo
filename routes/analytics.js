// routes/analytics.js

const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

// Route to get overall analytics
router.get('/overview', auth, analyticsController.getOverview);

// Route to get product statistics
router.get('/product-stats', auth, analyticsController.getProductStats);

// Route to get order statistics
router.get('/order-stats', auth, analyticsController.getOrderStats);

// Route to get user activity data
router.get('/user-activity', auth, analyticsController.getUserActivity);

module.exports = router;
