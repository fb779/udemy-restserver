const path = require('path');

const express = require('express');
const cors = require('cors');

const { port } = require('../config/config');
const { dbConnection } = require('../config/database');
const { socketController } = require('../sockets/socket');

class Server{
  constructor() {
    this.app = express();
    this.port = port;

    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.paths = {};

    this.conectarDB();

    this.middlewares();

    this.routes();

    this.socketsEvents();
  }

  async conectarDB(){
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.urlencoded({extended: true}));

    // parse application/json
    this.app.use(express.json());

    this.app.use(cors());
  }

  routes() {

    this.app.get('/', function (req, res) {
      res.status(200).json({
        ok: true,
        message: 'Hello World!',
      });
    });

    this.app.use(require('../routes/routes'));

    this.app.use('/public', express.static(path.resolve(__dirname, '..', '..', 'public')));
  }


  socketsEvents(){
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`API listening on port ${this.port}!`);
    });
    // this.app.listen(this.app.get('port'), () => {
    //   console.log(`API listening on port ${app.get('port')}!`);
    // });
  }
}

module.exports = Server;