'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

// serve index.html and lot request
router.get('/', function (req, res, next) {
    console.log(req.ip + " at " + new Date().toString());

    res.sendFile(path.join(__dirname + "/index.html"));
});

module.exports = router;