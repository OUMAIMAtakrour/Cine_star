const User = require("../../models/User");
const Client = require("../../models/Client");
const Admin = require("../../models/Admin");
const AuthInterface = require("../interfaces/authInterface");

class AuthRepository extends AuthInterface {
  async findByEmail(email) {
    return User.findOne({ email }).lean();
  }

  async createUser(userData) {
    const user = new User(userData);
    await user.save();
    return user.toObject();
  }

  async createClient(clientData) {
    const client = new Client(clientData);
    await client.save();
    return client.toObject();
  }

  async createAdmin(adminData) {
    const admin = new Admin(adminData);
    await admin.save();
    return admin.toObject();
  }
}

module.exports = new AuthRepository();