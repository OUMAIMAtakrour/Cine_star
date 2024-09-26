const mongoose = require('mongoose');

class Client {
  constructor(id, userId, address) {
    this.id = id;
    this.userId = userId;
    this.address = address;
  }

  getId() {
    return this.id;
  }

  getUserId() {
    return this.userId;
  }

  getAddress() {
    return this.address;
  }
}

const clientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String },
  },
  { timestamps: true }
);

clientSchema.loadClass(Client);

module.exports = mongoose.model('Client', clientSchema);