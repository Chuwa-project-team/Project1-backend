const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Category1', 'Category2', 'Category3', 'Category4', 'Category5'],
    default: 'Category1',
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'https://m.media-amazon.com/images/I/612kg3rGyYL._AC_UY218_.jpg',
  },
  createBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
