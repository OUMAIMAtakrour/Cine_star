const User = require('../models/User');

class UserDAO {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findById(userId) {
    return await User.findById(userId);
  }
}

module.exports = new UserDAO();
