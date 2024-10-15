const AuthService = require("../services/authService");

class AuthController {
  async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  login(req, res, next) {
    const { email, password } = req.body;
    AuthService.login(email, password)
      .then((result) => {
        res.json(result);
      })

      .catch((error) => {
        next(error);
      });
  }
}

module.exports = new AuthController();
