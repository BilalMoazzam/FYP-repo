// routes/notifications.js

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/auth');

// Get all notifications for logged-in user
router.get('/', verifyToken, notificationController.getNotifications);

// Mark a specific notification as read
router.put('/:id/read', verifyToken, notificationController.markAsRead);

// Delete a specific notification
router.delete('/:id', verifyToken, notificationController.deleteNotification);

module.exports = router;
