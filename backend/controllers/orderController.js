const Order = require('../models/order');

// Obtener todas las órdenes
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId'); // Carga información del producto
    res.render('admin/view_admin', { orders, section: 'orders', error: null });
  } catch (error) {
    console.error('Error al cargar órdenes:', error.message);
    res.render('admin/view_admin', { orders: [], section: 'orders', error: 'Error al cargar órdenes' });
  }
};

// Actualizar estado de una orden
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Actualiza el estado de la orden en la base de datos
    await Order.findByIdAndUpdate(id, { status });
    res.redirect('/admin/dashboard'); // Redirige de nuevo al panel de administración
  } catch (error) {
    console.error('Error al actualizar la orden:', error);
    res.status(500).send('Error al actualizar la orden');
  }
};

// Eliminar una orden
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // Elimina la orden de la base de datos
    await Order.findByIdAndDelete(id);
    res.redirect('/admin/dashboard'); // Redirige de nuevo al panel de administración
  } catch (error) {
    console.error('Error al eliminar la orden:', error);
    res.status(500).send('Error al eliminar la orden');
  }
};
