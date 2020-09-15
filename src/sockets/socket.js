const {io} = require('../server.js');

io.on('connection', (client) => {
  console.log('cliente conectado al server', client.id);

  client.emit('mensaje', {message: 'Bienvenido a los sockets con js'});

  client.on('disconnect', () => {
    console.log('usuario desconectado', client.id);
  });

  client.on('enviar-mensaje', (data, callback) => {
    console.log('llegada de mensajeria', data);

    client.broadcast.emit('mensaje', data);

    // if (!callback) return;

    // if (data.client) {
    //   callback({
    //     resp: 'data recibida',
    //   });
    // } else {
    //   callback({
    //     resp: 'problemas con la data',
    //   });
    // }
  });
});
