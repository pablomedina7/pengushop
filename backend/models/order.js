const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true }, // Agrega este campo
  quantity: { type: Number, required: true },
});


const OrderSchema = new Schema({
  customerName: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  items: [OrderItemSchema],
  status: { type: String, default: 'Pendiente' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
