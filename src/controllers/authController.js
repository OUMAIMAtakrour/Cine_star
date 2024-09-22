const authService = require('../services/authService');

class AuthController {
  async register(req, res) {
    try {
      const newUser = await authService.register(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { token, user } = await authService.login(email, password);
      return res.status(200).json({ token, user });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
