// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // Nuevo campo para guardar la URL de la imagen
  image: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
