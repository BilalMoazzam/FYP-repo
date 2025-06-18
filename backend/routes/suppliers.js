// routes/suppliers.js

const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const auth = require('../middleware/auth');

// Protected routes - only accessible to authenticated users
router.post('/', auth, supplierController.createSupplier);
router.get('/', auth, supplierController.getAllSuppliers);
router.get('/:id', auth, supplierController.getSupplierById);
router.put('/:id', auth, supplierController.updateSupplier);
router.delete('/:id', auth, supplierController.deleteSupplier);

module.exports = router;
