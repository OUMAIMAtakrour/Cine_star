const mongoose = require('mongoose');
const adminSchema = require('../schema/adminSchema');

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;