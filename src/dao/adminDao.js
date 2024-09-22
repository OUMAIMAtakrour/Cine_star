const Admin = require('../models/Admin');

class AdminDAO {
  async createAdmin(adminData) {
    const admin = new Admin(adminData);
    return await admin.save();
  }

  async findAdminByUserId(userId) {
    return await Admin.findOne({ user: userId });
  }
}

module.exports = new AdminDAO();
