import express from 'express';
import http from 'http';
import pty from 'pty.js';
import path from 'path';

var app = express();
var server = http.createServer(app).listen(3000);

import apiRouter from './api/router.js';
import bodyParser from 'body-parser';




// Static file serving

app.use(express.static('app'));
app.use(express.static('dist'));

app.use(bodyParser.json());

app.use('/api', apiRouter);


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


var auth = function(req, res, next) {

    function unauthorized(res){
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401)
    }

    const auth = {login: 'yes', password: 'no'} // change this

    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')

    if (!login || !password || login !== auth.login || password !== auth.password){
        return unauthorized(res);
    }
    return next();

}







console.log('server.js running on port 3000...\n');
//console.log('__dirname: ' + __dirname);
