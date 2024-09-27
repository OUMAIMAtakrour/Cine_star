const SessionService = require("../services/sessionService");

class SessionController {
  constructor(sessionService) {
    this.sessionService = sessionService;
  }

  async store(req, res) {
    try {
      const session = await this.sessionService.store(req);
      res.status(201).json(session);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      await this.sessionService.destroy(req);
      return res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const sessions = await this.sessionService.index();
      return res.json(sessions);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const session = await this.sessionService.show(req);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      return res.status(200).json(session);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const session = await this.sessionService.update(req);
      return res.json(session);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

const sessionService = new SessionService();
const sessionController = new SessionController(sessionService);

module.exports = sessionController;
