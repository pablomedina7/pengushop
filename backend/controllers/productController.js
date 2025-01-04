// /controllers/productController.js
const Product = require('../models/product');

// Crear un producto
exports.postCreateProduct = async (req, res) => {
  const { name, price } = req.body;
  const token = req.body.token || req.query.token || '';
  try {
    await Product.create({ name, price });
    // Redirige de nuevo al panel de admin
    res.redirect(`/admin/dashboard?token=${token}`);
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    res.redirect(`/admin/dashboard?token=${token}&error=Error al crear el producto`);
  }
};

// Editar un producto
exports.postEditProduct = async (req, res) => {
  const { name, price } = req.body;
  const token = req.body.token || req.query.token || '';
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
  const token = req.body.token || req.query.token || '';
  const productId = req.params.id;

  try {
    await Product.findByIdAndDelete(productId);
    res.redirect(`/admin/dashboard?token=${token}`);
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
    res.redirect(`/admin/dashboard?token=${token}&error=Error al eliminar el producto`);
  }
};
