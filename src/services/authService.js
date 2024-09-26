const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_KEY, TOKEN_EXPIRATION } = require("../config/jwt");
const AuthRepository = require("../repositories/implementations/authRepository");
const AuthInterface = require("../repositories/interfaces/authInterface");

class AuthService extends AuthInterface {
  constructor(authRepository) {
    super();
    this.authRepository = authRepository;
  }

  async login(email, password) {
    const user = await this.authRepository.findByEmail(email);
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
    const existingUser = await this.authRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await this.authRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    if (userData.role === 'client') {
      const client = await this.authRepository.createClient({ user: newUser._id, ...userData });
      return { ...newUser, clientData: client };
    }

    if (userData.role === 'admin') {
      const admin = await this.authRepository.createAdmin({ user: newUser._id, ...userData });
      return { ...newUser, adminData: admin };
    }

    return newUser;
  }
}

module.exports = new AuthService(AuthRepository);