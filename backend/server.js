// server.js
require('dotenv').config(); // Cargar variables de entorno al inicio

const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const User = require('./models/User');

// Rutas
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Conexión a la base de datos
connectDB().then(() => {
  createDefaultAdmin(); // Creamos el usuario admin por defecto, si no existe
});

// Crear admin por defecto
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        password: 'password123',
        role: 'admin',
      });
      console.log('Usuario administrador por defecto creado: admin/password123');
    } else {
      console.log('El usuario administrador ya existe.');
    }
  } catch (error) {
    console.error(
      'Error al crear el usuario administrador por defecto:',
      error
    );
  }
};

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// (Opcional) si quieres leer el token aquí también, pero ya lo tienes en el authMiddleware
app.use((req, res, next) => {
  const token = req.query.token || req.headers.authorization;
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

// Uso de rutas
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/users', userRoutes); // o '/admin/users', depende de tu preferencia

// Servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
