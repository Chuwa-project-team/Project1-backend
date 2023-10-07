const jwt = require('jsonwebtoken');
const db = require('../models');

const signup = async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    const {
      id, email, role,
    } = user;
    const token = jwt.sign(
      {
        id,
        email,
        role,
      },
      process.env.SECRET_KEY,
    );
    return res.status(200).json({
      id,
      email,
      token,
    });
  } catch (err) {
    return res.status(400).json({
    });
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      const { id, role } = user;
      const token = jwt.sign(
        {
          id,
          email,
          role,
        },
        process.env.SECRET_KEY,
      );
      return res.status(200).json({
        id,
        email,
        token,
      });
    }
    throw new Error('Invalid Email/Password');
  } catch (err) {
    return next({
      status: 400,
      message: 'Invalid Email/Password',
    });
  }
};

module.exports = { signup, signin };
