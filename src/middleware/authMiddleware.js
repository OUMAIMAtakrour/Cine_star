const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/jwt');
const User = require('../models/User');
const Admin = require('../models/Admin');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      const admin = await Admin.findOne({ user: user._id });
      if (!admin) {
        return res.status(401).json({ message: 'Admin data not found' });
      }
      user.adminData = admin;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;