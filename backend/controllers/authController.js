const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Renderizar la página de login
exports.getLogin = (req, res) => {
  res.render('admin/login', { error: null });
};

// Manejar el formulario de login
exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.render('admin/login', { error: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    // Redirigir al dashboard con el token en la URL
    res.redirect(`/admin/dashboard?token=${token}`);
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.render('admin/login', { error: 'Error al iniciar sesión' });
  }
};


