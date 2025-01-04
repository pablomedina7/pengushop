const Product = require('../models/product'); // Asegúrate de que este archivo existe y está correctamente configurado
const Order = require('../models/order'); // Asegúrate de que este archivo existe y está correctamente configurado
// Obtener todos los productos y órdenes
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Obtiene todos los productos
    const orders = await Order.find().populate('items.productId'); // Obtiene todas las órdenes y resuelve los productos relacionados
    const token = req.query.token || ''; // Obtiene el token desde la consulta o agrega lógica para almacenarlo

    res.render('admin/view_admin', { products, orders, token, error: null });
  } catch (error) {
    console.error('Error al cargar productos y órdenes:', error.message);
    res.render('admin/view_admin', { products: [], orders: [], token: '', error: 'Error al cargar productos y órdenes' });
  }
};

// Crear un producto
exports.postCreateProduct = async (req, res) => {
  const { name, price, token } = req.body;
  try {
    await Product.create({ name, price });
    res.redirect(`/admin/dashboard?token=${token}`);
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    res.redirect(`/admin/dashboard?token=${token}&error=Error al crear el producto`);
  }
};

// Editar un producto
exports.postEditProduct = async (req, res) => {
  const { name, price, token } = req.body;
  const productId = req.params.id;

  try {
    await Product.findByIdAndUpdate(productId, { name, price });
    res.redirect(`/admin/dashboard?token=${token}`);
  } catch (error) {
    console.error('Error al actualizar el producto:', error.message);
    res.redirect(`/admin/dashboard?token=${token}&error=Error al actualizar el producto`);
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  const { token } = req.body;
  const productId = req.params.id;

  try {
    await Product.findByIdAndDelete(productId);
    res.redirect(`/admin/dashboard?token=${token}`);
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
    res.redirect(`/admin/dashboard?token=${token}&error=Error al eliminar el producto`);
  }
};
