const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3002;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  
  // socket.emit to all of the clients
  socket.emit('newMsgFromServer', {
    from: 'server',
    text: 'Hi, welcome our new user',
    createdAt: new Date().getTime()
  });

  // socket.broadcast.emit to all of the clients except for the new one
  socket.broadcast.emit('newMsgFromServer', {
    from: 'server',
    text: 'Hi, a user just joined the chat',
    createdAt: new Date().getTime()
  });

  socket.on('newMsgFromBrowser', (msg) => {
    // io.emit to all of the clients
    io.emit('newMsgFromServer', {
      from: msg.from + '(via emit)',
      text: msg.text,
      createdAt: new Date().getTime()
    });

    // io.broadcast.emit to all of the clients except for the one who sent the message
    socket.broadcast.emit('newMsgFromServer', {
      from: msg.from + '(via broadcast)',
      text: msg.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});