const mongoose = require('mongoose');
const userSchema = require('../schema/UserSchema');

const User = mongoose.model('User', userSchema);

module.exports = User;