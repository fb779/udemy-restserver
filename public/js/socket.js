let socket = io();

socket.on('connect', () => {
  console.log('conectado al servidor');
});

socket.on('disconnect', () => {
  console.log('Desconexion del seridor');
});

socket.on('mensaje', (dt) => {
  console.log('Mensaje desde el server', dt);
});

// socket.emit('enviar-mensaje', { client: 'mi perrito', message: 'hola mis perritos queridos' }, function (msDt) {
//   console.log('callback', msDt);
// });
