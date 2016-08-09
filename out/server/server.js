'use strict';

var express = require('express');
var http = require('http');
var fs = require('fs');
var pty = require('pty.js');
var path = require('path');
//var favicon = require('serve-favicon');

var app = express();

var server = http.createServer(app).listen(3000);

var live = require('./api/live');
var history = require('./api/history');

// Static file serving
app.use(express.static('out'));
//app.use(favicon(__dirname + '/favicon.ico'));

app.use('/history', history);
app.use('/', live);

app.iruka = {};
app.iruka.tom = 'thomas natter';
app.iruka.count = 0;

// SOCKET IO SETUP for live page
// Bind socket.io to the server
var io = require('socket.io')(server);

// When a new socket connects
io.on('connection', function (socket) {
  // Create terminal
  var term = pty.spawn('sh', ['-c', 'cd ~/Dropbox/ideas/sans-souci; ./iruka json'], {
    name: 'xterm-color', cols: 80, rows: 30, cwd: process.env.HOME, env: process.env });

  // Listen on the terminal for output and send it to the client
  term.on('data', function (data) {
    socket.emit('output', data);
  });

  socket.on("disconnect", function () {
    term.destroy();
    console.log("disconnected at " + new Date().toString() + "\n");
  });
});

console.log('server.js running on port 3000...\n');
console.log('__dirname: ' + __dirname);