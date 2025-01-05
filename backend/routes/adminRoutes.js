const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Rutas del panel de administración
router.get('/dashboard', adminController.viewAdminDashboard);
router.post('/products/create', adminController.createProduct);
router.post('/products/edit/:id', adminController.editProduct);
router.post('/products/delete/:id', adminController.deleteProduct);
router.post('/orders/:id/update', adminController.updateOrder);
router.post('/orders/:id/delete', adminController.deleteOrder);

module.exports = router;
