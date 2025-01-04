const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Verifica que la ruta sea correcta

// Ruta para obtener todos los productos
router.get('/', productController.getAllProducts);

// Ruta para mostrar el formulario de creación
router.get('/create', productController.getCreateProduct);

// Ruta para procesar la creación de un producto
router.post('/create', productController.postCreateProduct);

// Ruta para mostrar el formulario de edición
router.get('/edit/:id', productController.getEditProduct);

// Ruta para procesar la edición de un producto
router.post('/edit/:id', productController.postEditProduct);

// Ruta para eliminar un producto
router.post('/delete/:id', productController.deleteProduct);

module.exports = router;
