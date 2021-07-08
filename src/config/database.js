const mongoose = require('mongoose');

const {db_url} = require('./config');

const dbConnection = async ()=>{
  try {
    await mongoose.connect(db_url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`Base de datos OK!`);
  } catch (error) {
    console.log(error);
    throw new Error('Error de coneccion a la BD');
  }
}

module.exports = {
  dbConnection
};