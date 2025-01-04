const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');

// Ruta para obtener todos los productos
router.get('/dashboard', verifyToken, productController.getAllProducts);

// Ruta para crear un producto
router.post('/products/create', verifyToken, productController.postCreateProduct);

// Ruta para editar un producto
router.post('/products/edit/:id', verifyToken, productController.postEditProduct);

// Ruta para eliminar un producto
router.post('/products/delete/:id', verifyToken, productController.deleteProduct);

module.exports = router;
