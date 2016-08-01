const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: {type: String, required: true },
  email: { type: String },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
