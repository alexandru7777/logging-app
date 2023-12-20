const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  level: String,
  message: String,
  service: String,
  environment: String,
  host: String,
  user: String,
  statusCode: Number,
  method: String,
  url: String,
  // You can add additional fields as needed
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;