// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getLogin = (req, res) => {
  // Renderizar formulario de login (GET)
res.render('admin/login', { error: null });
};

exports.postLogin = async (req, res) => {
  // Procesar el login (POST)
const { username, password } = req.body;
try {
    const user = await User.findOne({ username });
    if (!user) {
    return res.render('admin/login', { error: 'Usuario no encontrado' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
    return res.render('admin/login', { error: 'Credenciales inválidas' });
    }

    // Generar token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
    });

    // Guardar el token en una cookie
    res.cookie('token', token, { httpOnly: true });

    return res.redirect('/admin/dashboard');
} catch (error) {
    console.error(error);
    return res.render('admin/login', { error: 'Error al iniciar sesión' });
}
};
