const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/jwt");
const userDAO = require("../dao/userDao");
const adminDAO = require("../dao/adminDao");
const clientDAO = require("../dao/clientDao");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await userDAO.findById(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    if (user.role === "admin") {
      const adminData = await adminDAO.findByUserId(user._id);
      req.user.adminData = adminData;
    } else if (user.role === "client") {
      const clientData = await clientDAO.findByUserId(user._id);
      req.user.clientData = clientData;
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate." });
  }
};

module.exports = authMiddleware;
