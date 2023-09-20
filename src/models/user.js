const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema  = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  refreshToken: [String],
});

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
