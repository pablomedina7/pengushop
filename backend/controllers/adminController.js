// /controllers/adminController.js
const Order = require('../models/order');
const Product = require('../models/product');

exports.viewAdminDashboard = async (req, res) => {
  try {
    // Cargamos todos los productos
    const products = await Product.find();

    // Cargamos todas las órdenes (populando sus productos)
    const orders = await Order.find().populate('items.productId');

    // Renderizamos el panel de administración
    res.render('admin/view_admin', {
      products,
      orders,
      token: req.query.token || '', 
      error: null
    });
  } catch (error) {
    console.error('Error al cargar el dashboard de administración:', error);
    res.status(500).send('Error al cargar el panel de administración');
  }
};
