// /routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

// Dashboard principal (productos, órdenes, etc.)
router.get('/dashboard', verifyToken, adminController.viewAdminDashboard);

// Productos
router.post('/products/create', verifyToken, productController.postCreateProduct);
router.post('/products/edit/:id', verifyToken, productController.postEditProduct);
router.post('/products/delete/:id', verifyToken, productController.deleteProduct);

// Órdenes
router.post('/orders/:id/update', verifyToken, orderController.updateOrderStatus);
router.post('/orders/:id/delete', verifyToken, orderController.deleteOrder);

module.exports = router;
