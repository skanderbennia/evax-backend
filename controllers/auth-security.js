const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(' ')[1];
  if (!token)
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
    });

  let verified;

  try {
    verified = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({
      status: 401,
      message: 'The token no longer exists',
    });
  }

  const currentUser = await User.findById(verified.id);
  req.user = currentUser;

  next();
};

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized',
      });
    next();
  };
