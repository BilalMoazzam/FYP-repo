  const express = require('express');
  const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserStats
  } = require('../controllers/userController');
  const { protect, authorize } = require('../middleware/auth');
  const { validateUser } = require('../middleware/validation');

  const router = express.Router();

  router.use(protect); // All routes are protected

  router
    .route('/')
    .get(authorize('Admin', 'Manager'), getUsers)
    .post(authorize('Admin', 'Manager'), validateUser, createUser);

  router.get('/stats', authorize('Admin', 'Manager'), getUserStats);

  router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(authorize('Admin'), deleteUser);

  module.exports = router;