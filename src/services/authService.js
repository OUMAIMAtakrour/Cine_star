const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_KEY, TOKEN_EXPIRATION } = require("../config/jwt");
const userDAO = require("../dao/userDao");
const adminDAO = require("../dao/adminDao");
const clientDAO = require("../dao/clientDao");

class AuthService {
  async login(email, password) {
    const user = await userDAO.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, {
      expiresIn: TOKEN_EXPIRATION,
    });

    return { token, user };
  }

  async register(userData) {
    const existingUser = await userDAO.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await userDAO.createUser({
      ...userData,
      password: hashedPassword,
    });

    if (newUser.role === 'client') {
      const client = await clientDAO.createClient({ user: newUser._id, ...userData });
      return { ...newUser.toObject(), clientData: client };
    }

    if (newUser.role === 'admin') {
      const admin = await adminDAO.createAdmin({ user: newUser._id, ...userData });
      return { ...newUser.toObject(), adminData: admin };
    }

    return newUser;
  }
}

module.exports = new AuthService();
