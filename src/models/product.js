const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
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
