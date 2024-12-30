// controllers/orderController.js
const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
try {
    // populate para ver info de los productos en items
    const orders = await Order.find().populate('items.productId');
    res.render('admin/orderList', { orders, error: null });
} catch (error) {
    console.error(error);
    res.render('admin/orderList', { orders: [], error: 'No se pudieron obtener los pedidos' });
}
};
