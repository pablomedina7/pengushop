const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Verifica esta ruta

// Rutas de autenticación
router.get('/login', authController.getLogin); // Renderizar la página de login
router.post('/login', authController.postLogin); // Manejar el formulario de login

module.exports = router;
