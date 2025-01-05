const Product = require('../models/product');
const Order = require('../models/order');

// Mostrar el dashboard de administración
exports.viewAdminDashboard = async (req, res) => {
  try {
    // Obtener todos los productos de la base de datos
    const products = await Product.find({});

    // Obtener las órdenes si ya están configuradas
    const orders = await Order.find({})
      .populate('items.productId') // Asegurarnos de popular los productos en las órdenes
      .exec();

    // Renderizar la vista con los datos
    res.render('admin/view_admin', { products, orders, error: null });
  } catch (err) {
    console.error('Error al cargar el panel de administrador:', err);
    res.render('admin/view_admin', { products: [], orders: [], error: 'Ocurrió un error al cargar los datos' });
  }
};


// Crear un producto
exports.createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  try {
    await Product.create({ name, price, image });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    res.redirect('/admin/dashboard?error=Error al crear el producto');
  }
};

// Editar un producto
exports.editProduct = async (req, res) => {
  const { name, price } = req.body;
  const productId = req.params.id;
  try {
    await Product.findByIdAndUpdate(productId, { name, price });
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
