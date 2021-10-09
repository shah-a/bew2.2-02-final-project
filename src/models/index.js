const mongoose = require('mongoose');
const User = require('./user');
const Location = require('./location');

// eslint-disable-next-line arrow-body-style
const connectDb = (URI) => {
  // mongoose.set('debug', true);
  return mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = {
  connectDb, User, Location
};
