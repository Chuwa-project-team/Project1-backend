const jwt = require('jsonwebtoken');
const db = require('../models');
const signup = async (req, res) => {
  try {
    console.log(req.body);
    const user = await db.User.create(req.body);
    
    const { id, username, email } = user;

    console.log(id, username, email);
    const token = jwt.sign(
      {
        id,
        username,
        email,
      },
      process.env.SECRET_KEY,
    );
    return res.status(200).json({
      id,
      username,
      email,
      token,
    });
  } catch(err) {
    console.log(err);
    return res.status(400).json({
    });
  }
};

const signin = async (req, res, next) => {
  next(new Error('Not Implemented'));
};

module.exports = { signup, signin };