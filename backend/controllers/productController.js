// controllers/productController.js
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
try {
    const products = await Product.find();
    res.render('admin/productList', { products, error: null });
} catch (error) {
    console.error(error);
    res.render('admin/productList', { products: [], error: 'No se pudieron obtener los productos' });
}
};

exports.getCreateProduct = (req, res) => {
  // Render de formulario de creación
res.render('admin/productForm', { product: {}, error: null });
};

exports.postCreateProduct = async (req, res) => {
const { name, description, price } = req.body;
try {
    await Product.create({ name, description, price });
    res.redirect('/admin/products');
} catch (error) {
    console.error(error);
    res.render('admin/productForm', { product: {}, error: 'Error al crear producto' });
}
};

exports.getEditProduct = async (req, res) => {
try {
    const product = await Product.findById(req.params.id);
    if (!product) {
    return res.redirect('/admin/products');
    }
    res.render('admin/productForm', { product, error: null });
} catch (error) {
    console.error(error);
    res.redirect('/admin/products');
}
};

exports.postEditProduct = async (req, res) => {
const { name, description, price } = req.body;
try {
    await Product.findByIdAndUpdate(req.params.id, { name, description, price });
    res.redirect('/admin/products');
} catch (error) {
    console.error(error);
    res.redirect('/admin/products');
}
};
exports.deleteProduct = async (req, res) => {
try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
} catch (error) {
    console.error(error);
    res.redirect('/admin/products');
}
};
