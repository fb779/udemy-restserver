const socketController = (socket) => {
  console.log('cliente conectado al server', socket.id);

  socket.on('disconnect', () => {
    console.log('usuario desconectado', socket.id);
  });

  socket.emit('mensaje', {message: 'Bienvenido a los sockets con js'});


  socket.on('enviar-mensaje', (data, callback) => {
    console.log('llegada de mensajeria', data);

    socket.broadcast.emit('mensaje', data);

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
};

module.exports = {socketController};