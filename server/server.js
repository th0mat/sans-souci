"use strict";


import express from 'express';
import http from 'http';
import pty from 'pty.js';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import logger from './log'

var app = express();
var server = http.createServer(app).listen(3000);

import apiRouter from './api/router.js';

// CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


// apply middleware

// setup the logger
var logDir = path.normalize(__dirname + '/../log/');
var accessLogStream = fs.createWriteStream(logDir + 'access.log', {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('app'));
app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use('/api', apiRouter);


// redirects
app.get('/about*', function(req, res) {
    res.redirect('/');
});
app.get('/history*', function(req, res) {
    res.redirect('/');
});




// SOCKET IO SETUP for live page
// Bind socket.io to the server
var io = require('socket.io')(server);

// When a new socket connects
io.on('connection', function (socket) {
    // Create terminal
    let headers = socket.handshake.headers;
    logger.warn("new socket conn: " + headers.host + ', ' + headers.referer + ', '
        + headers['user-agent'].substr(0,60) + '...');
    var term = pty.spawn('sh', ['-c', 'cd ~/Dropbox/ideas/sans-souci; ./iruka json'], {
            name: 'xterm-color', cols: 80, rows: 30, cwd: process.env.HOME, env: process.env
        }
    );

    // Listen on the terminal for output and send it to the client
    term.on('data', function (data) {
        socket.emit('output', data);
    });

    socket.on("disconnect", function () {
        let headers = this.handshake.headers;
        logger.warn("del socket conn: " + headers.host + ', ' + headers.referer + ', '
            + headers['user-agent'].substr(0,60) + '...');
        term.destroy();
    });
});


logger.info('server.js running on port 3000');
