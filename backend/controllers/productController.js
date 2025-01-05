// controllers/productController.js
const Product = require('../models/product');

exports.postCreateProduct = async (req, res) => {
  const { name, price, image, token } = req.body;
  try {
    await Product.create({ name, price, image });
    res.redirect(`/admin/dashboard?token=${token}`);
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    res.redirect(`/admin/dashboard?token=${token}&error=Error al crear el producto`);
  }
};

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
