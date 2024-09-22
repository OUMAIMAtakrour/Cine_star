const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = clientSchema;
