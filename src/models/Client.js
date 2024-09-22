const mongoose = require('mongoose');
const clientSchema = require('../schema/clientSchema');

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
