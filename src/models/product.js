const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
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
});

module.exports = mongoose.model('Product', productSchema);
