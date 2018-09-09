var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('newMsgFromBrowser', {
      from: 'Browser',
      text: 'Hi, I come from the server.'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMsgFromServer', function (msg) {
  console.log('New message from server', msg);
});
