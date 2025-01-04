// /controllers/orderController.js
const Order = require('../models/order');

// Actualizar estado de una orden
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await Order.findByIdAndUpdate(id, { status });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al actualizar la orden:', error);
    res.status(500).send('Error al actualizar la orden');
  }
};

// Eliminar una orden
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al eliminar la orden:', error);
    res.status(500).send('Error al eliminar la orden');
  }
};
