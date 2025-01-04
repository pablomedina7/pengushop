// controllers/userController.js
const User = require('../models/User');

exports.getRegisterForm = (req, res) => {
  // Muestra el formulario para crear un nuevo usuario
  res.render('admin/userForm', { error: null });
};

exports.postRegisterForm = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Opcional: verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('admin/userForm', { error: 'El usuario ya existe' });
    }

    // Crear y guardar el nuevo usuario
    await User.create({ username, password, role });
    
    // Redirigir a donde prefieras (ej: lista de usuarios, dashboard, etc.)
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.render('admin/userForm', { error: 'Error al crear usuario' });
  }
};
