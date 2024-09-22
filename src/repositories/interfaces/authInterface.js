class AuthInterface {
  async findUserByEmail(email) {
    throw new Error("Method not implemented");
  }

  async createUser(userData) {
    throw new Error("Method not implemented");
  }
}

module.exports = AuthInterface;
