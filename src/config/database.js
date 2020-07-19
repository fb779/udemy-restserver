const mongoose = require('mongoose');

const { db_url } = require('./config');

mongoose.connect(db_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = mongoose;
