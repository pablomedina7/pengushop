// backend/controllers/adminController.js
const Order = require('../models/order');

exports.viewAdminDashboard = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId');
    res.render('admin/view_admin', { orders });
  } catch (error) {
    console.error('Error al cargar las órdenes:', error);
    res.status(500).send('Error al cargar el panel de administración');
  }
};
