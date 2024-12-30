// server.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();

// Conectar a Mongo
connectDB();

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/auth', authRoutes);

app.get('/admin/dashboard', (req, res) => {
res.render('admin/dashboard');
});

app.use('/admin/products', productRoutes);
app.use('/admin/orders', orderRoutes);

// Puesta en marcha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Servidor Node corriendo en el puerto ${PORT}`);
});
