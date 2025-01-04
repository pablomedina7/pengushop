// /controllers/userController.js
const User = require('../models/User');

exports.getRegisterForm = (req, res) => {
  res.render('admin/userForm', { error: null });
};

exports.postRegisterForm = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('admin/userForm', { error: 'El usuario ya existe' });
    }
    await User.create({ username, password, role });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.render('admin/userForm', { error: 'Error al crear usuario' });
  }
};
