const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User'); // Modelo de usuario
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Nueva ruta para las órdenes
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
connectDB();

// Función para crear un usuario administrador por defecto
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        password: 'password123', // La contraseña será hasheada según tu modelo
        role: 'admin',
      });
      console.log('Usuario administrador por defecto creado: admin / password123');
    } else {
      console.log('El usuario administrador ya existe.');
    }
  } catch (error) {
    console.error('Error al crear el usuario administrador por defecto:', error);
  }
};

// Crear el usuario por defecto después de conectar la base de datos
connectDB().then(() => {
  createDefaultAdmin();
});

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Permite manejar datos JSON en solicitudes

// Middleware para manejar JWT en los encabezados
app.use((req, res, next) => {
  const token = req.query.token || req.headers['authorization'];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
    } catch (error) {
      console.error('Token inválido:', error.message);
    }
  }
  next();
});

// Rutas
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/admin/orders', orderRoutes); // Rutas de manejo de órdenes

// Archivos estáticos (opcional para servir CSS o imágenes desde /public)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
