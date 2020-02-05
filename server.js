// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var rpsGame = require('./game-logic.js')

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

let waiting = null;

io.on('connection', (sock) => {
  sock.emit('message', 'You are connected');

  if(waiting) {

    sock.emit('message', 'Start Player 2');
    waiting.emit('message', 'Start Player 1');

    new rpsGame(waiting, sock);

    waiting = null;

  }else{
    waiting = sock;
    waiting.emit('message', "Second Player Needed")
  }
});

server.listen(5000, function() {
  console.log('Starting server on port 5000');
});
