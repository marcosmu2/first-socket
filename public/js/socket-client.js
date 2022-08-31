const lblOnline = document.getElementById('lblOnline');
const lblOffline = document.getElementById('lblOffline');
const txtMensaje = document.getElementById('txtMensaje');
const btnEnviar = document.getElementById('btnEnviar');

const clientSocket = io();

clientSocket.on('connect', () => {
  console.log('conectado');

  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

clientSocket.on('disconnect', () => {
  console.log('desconectado');
  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});

clientSocket.on('enviar-mensaje', (payload) => {
  console.log(payload);
});

btnEnviar.addEventListener('click', () => {
  const mensaje = txtMensaje.value;
  const payload = {
    mensaje,
    id: '123ABC',
    fecha: new Date().getTime(),
  };

  clientSocket.emit('enviar-mensaje', payload, (id) => {
    console.log('desde el server', id);
  });
});
