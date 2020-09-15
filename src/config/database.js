const mongoose = require('mongoose');

const {db_url} = require('./config');

// console.log('Coneccion a mongo', db_url);

mongoose.connect(db_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = mongoose;
