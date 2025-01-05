require('dotenv').config(); // Cargar variables de entorno al inicio

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Rutas
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Conexión a la base de datos
connectDB().then(() => {
  createDefaultAdmin(); // Crear usuario administrador por defecto si no existe
});

// Crear admin por defecto
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        password: 'password123', // Cambiar la contraseña después de la configuración inicial
        role: 'admin',
      });
      console.log('Usuario administrador por defecto creado: admin/password123');
    } else {
      console.log('El usuario administrador ya existe.');
    }
  } catch (error) {
    console.error('Error al crear el usuario administrador por defecto:', error);
  }
};

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para manejar tokens JWT
app.use((req, res, next) => {
  const token = req.query.token || req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId; // Adjunta el userId decodificado a la solicitud
    } catch (error) {
      console.error('Token inválido:', error.message);
    }
  }
  next();
});

// Uso de rutas
app.use('/auth', authRoutes); // Rutas de autenticación (login)
app.use('/admin', adminRoutes); // Rutas del panel de administración

// Servir archivos estáticos (CSS, imágenes, etc.)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error('Error:', err.message || err);
  res.status(err.status || 500).send('Ocurrió un error en el servidor.');
});

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
