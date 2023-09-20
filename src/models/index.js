
const mongoose = require('mongoose');
const User = require('./user');
const { productSchema } = require('./product.js');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
};

connectDB();

module.exports.User = User;
