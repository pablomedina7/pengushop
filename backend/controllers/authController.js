const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getLogin = (req, res) => {
  res.render('admin/login', { error: null }); // Incluye 'admin/' en la ruta de la vista
};


exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.render('admin/login', { error: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Redirigir con el token como parámetro en la URL
    res.redirect(`/admin/dashboard?token=${token}`);
  } catch (error) {
    console.error(error);
    res.render('admin/login', { error: 'Error al iniciar sesión' });
  }
};


exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
};
