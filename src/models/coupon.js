const mongoose = require('mongoose');

const { Schema } = mongoose;

const couponSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
    default: (Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
});

module.exports = mongoose.model('Coupon', couponSchema);
