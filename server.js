const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('message', (message) => {
    console.log('Message received:', message);
    io.emit('message', message); // Broadcast message to all clients
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
