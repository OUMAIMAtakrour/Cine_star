const Client = require('../models/Client');

class ClientDAO {
  async createClient(clientData) {
    const client = new Client(clientData);
    return await client.save();
  }

  async findClientByUserId(userId) {
    return await Client.findOne({ user: userId });
  }
}

module.exports = new ClientDAO();
