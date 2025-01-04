const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para mostrar el formulario de login
router.get('/login', authController.getLogin);

// Ruta para procesar el login
router.post('/login', authController.postLogin);

// Ruta para cerrar sesión
router.get('/logout', authController.logout);

module.exports = router;
