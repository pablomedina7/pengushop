// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

// GET: muestra el formulario
router.get('/register', verifyToken, userController.getRegisterForm);

// POST: procesa el formulario
router.post('/register', verifyToken, userController.postRegisterForm);

module.exports = router;
