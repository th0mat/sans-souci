'use strict';

var express = require('express');
var router = express.Router();

router.get('/:day/:mac', function (req, res, next) {
    req.app.iruka.count++;
    res.send("History in the making for " + logFileDayRel(30));
});

function logFileDayRel() {
    var daysBeforeToday = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    var today = new Date();
    var targetDate = new Date(today.setDate(today.getDate() - daysBeforeToday));
    var fileName = today.toISOString().substr(0, 10) + ".log";
    return fileName;
}

function getData() {
    return {
        "this": "first",
        "that": "second",
        "any": "third"
    };
}

module.exports = router;