// /models/order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerName: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  status: { type: String, default: 'Pendiente' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
