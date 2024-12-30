// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, productController.getAllProducts);
router.get('/create', verifyToken, productController.getCreateProduct);
router.post('/create', verifyToken, productController.postCreateProduct);
router.get('/edit/:id', verifyToken, productController.getEditProduct);
router.post('/edit/:id', verifyToken, productController.postEditProduct);
router.post('/delete/:id', verifyToken, productController.deleteProduct);

module.exports = router;
