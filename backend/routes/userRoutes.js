// /routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/register', verifyToken, userController.getRegisterForm);
router.post('/register', verifyToken, userController.postRegisterForm);

module.exports = router;
