// /routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Mostrar login
router.get('/login', authController.getLogin);
// Procesar login
router.post('/login', authController.postLogin);
// Cerrar sesión
router.get('/logout', authController.logout);

module.exports = router;
