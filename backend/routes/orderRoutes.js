const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');

// Rutas para las órdenes
router.get('/orders', verifyToken, getAllOrders); // Mostrar todas las órdenes
router.post('/orders/:id/update', verifyToken, updateOrderStatus); // Actualizar estado
router.post('/orders/:id/delete', verifyToken, deleteOrder); // Eliminar una orden

module.exports = router;
