const SessionRepository = require("../repositories/implementations/sessionRepository");

class SessionService {
  constructor() {
    this.sessionRepository = new SessionRepository();
  }

  async store(req) {
    return await this.sessionRepository.store(req);
  }

  async destroy(req) {
    return await this.sessionRepository.destroy(req);
  }

  async index() {
    return await this.sessionRepository.index();
  }

  async show(req) {
    return await this.sessionRepository.show(req);
  }

  async update(req) {
    return await this.sessionRepository.update(req);
  }
}

module.exports = SessionService;
