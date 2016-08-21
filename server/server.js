import express from 'express';
import http from 'http';
//import fs from 'fs';
import pty from 'pty.js';
import path from 'path';

var app = express();
var server = http.createServer(app).listen(3000);

import apiRouter from './api/router.js';


// Static file serving
app.use(express.static('app'));
app.use(express.static('dist'));

app.use('/api', apiRouter);

app.get('/history*', function(req, res) {
    res.redirect('/');
});
app.get('/about*', function(req, res) {
    res.redirect('/');
});

// app.iruka = {};
// app.iruka.tom = 'thomas natter';
// app.iruka.count = 0;
// app.iruka.rootDir = path.normalize(__dirname + '/../..');


// SOCKET IO SETUP for live page
// Bind socket.io to the server
var io = require('socket.io')(server);

// When a new socket connects
io.on('connection', function (socket) {
    // Create terminal
    var term = pty.spawn('sh', ['-c', 'cd ~/Dropbox/ideas/sans-souci; ./iruka json'], {
            name: 'xterm-color', cols: 80, rows: 30, cwd: process.env.HOME, env: process.env
        }
    );

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
//console.log('__dirname: ' + __dirname);
