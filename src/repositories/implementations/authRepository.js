const User = require("../../models/User");
const Client = require("../../models/Client");
const Admin = require("../../models/Admin");
const  AuthInterface  = require("../interfaces/authInterface");

class AuthRepository extends AuthInterface {
  async findUserByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) return null;

    const client = await Client.findOne({ user: user._id });
    if (client)
      return { ...user.toObject(), role: "client", clientData: client };

    const admin = await Admin.findOne({ user: user._id });
    if (admin) return { ...user.toObject(), role: "admin", adminData: admin };

    return user;
  }

  async createUser(userData) {
    const { role, ...otherData } = userData;

    const user = new User(otherData);
    await user.save();

    if (role === "client") {
      const client = new Client({ user: user._id, ...otherData });
      await client.save();
      return { ...user.toObject(), role: "client", clientData: client };
    } else if (role === "admin") {
      const admin = new Admin({ user: user._id, ...otherData });
      await admin.save();
      return { ...user.toObject(), role: "admin", adminData: admin };
    }

    return user;
  }
}

module.exports = new AuthRepository();
