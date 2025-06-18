// utils/generateToken.js

const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiry } = require('../config/jwt');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    jwtSecret,
    { expiresIn: jwtExpiry }
  );
};

module.exports = generateToken;
