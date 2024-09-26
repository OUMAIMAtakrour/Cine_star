class AuthInterface {
  async login(email, password) {
    throw new Error("Method not implemented");
  }

  async register(userData) {
    throw new Error("Method not implemented");
  }
}

module.exports = AuthInterface;