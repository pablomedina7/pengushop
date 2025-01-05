const Product = require('../models/product');
const Order = require('../models/order');

// Mostrar el dashboard de administración
exports.viewAdminDashboard = async (req, res) => {
  try {
    const products = await Product.find({});
    const orders = await Order.find({})
      .populate('items.productId', 'name image price') // Incluye los detalles del producto
      .exec();

    const token = req.query.token; // O el método que uses para obtener el token

    res.render('admin/view_admin', { products, orders, token, error: null });
  } catch (err) {
    console.error('Error al cargar el panel de administración:', err);
    res.render('admin/view_admin', { products: [], orders: [], token: '', error: 'Ocurrió un error al cargar los datos.' });
  }
};


// Crear un producto
exports.createProduct = async (req, res) => {
  const { name, price, image, quantity } = req.body;
  try {
    await Product.create({ name, price, image, quantity });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    res.redirect('/admin/dashboard?error=Error al crear el producto');
  }
};


// Editar un producto
// Editar un producto
exports.editProduct = async (req, res) => {
  const { name, price, quantity } = req.body;
  const productId = req.params.id;
  try {
    await Product.findByIdAndUpdate(productId, { name, price, quantity });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al editar producto:', error.message);
    res.redirect('/admin/dashboard?error=Error al editar el producto');
  }
};


// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    await Product.findByIdAndDelete(productId);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
    res.redirect('/admin/dashboard?error=Error al eliminar el producto');
  }
};

// Actualizar una orden
exports.updateOrder = async (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;
  try {
    await Order.findByIdAndUpdate(orderId, { status });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al actualizar orden:', error.message);
    res.redirect('/admin/dashboard?error=Error al actualizar la orden');
  }
};

// Eliminar una orden
exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    await Order.findByIdAndDelete(orderId);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al eliminar orden:', error.message);
    res.redirect('/admin/dashboard?error=Error al eliminar la orden');
  }
};
