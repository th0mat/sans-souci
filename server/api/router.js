"use strict";


import express from 'express';
var router = express.Router();
import * as history from './history.js';
import {getTargetsJson} from './sendConfig';
import promiseNotifyUpdate from './updateNotify';
import calcNotify from './calcNotify'
import logSysPid from './sysup'
import logger from '../log'

// check if log sys is running
var pid = logSysPid();
if (pid) {
    logger.info("logSys is running with pid " + pid)
} else {
    logger.warn("logSys is not running");
}


// var numberOfDays = 3;
history.fetchHistoryAsync();
history.fetchLastSeen();


var pendingNotifications = [];


// reload iruka.data in 1 minute intervals
setInterval(
    history.fetchHistoryAsync
    , 60000
);
setInterval(
    history.fetchLastSeen
    , 60000
);

setInterval(
    calcNotify.bind(null, history)
    , 60000
);

// history.fetchHistoryAsync(3);

router.get('/config/targets', function (req, res, next) {
    var targetsJson = getTargetsJson(history.lastSeen);
    res.send(targetsJson);
});


router.post('/config/updateNotify', function (req, res, next) {
    promiseNotifyUpdate(req.body.targets)
        .then((result) => {res.send(result)})
        .catch((error) => {res.send(error)});
});


//export default router.get('/history/:day/:mac', function (req, res, next) {
router.get('/history/:mac', function (req, res, next) {
    var notAvail = JSON.stringify({"request result": "no data available"});
    var response = history.macSet.has(req.params.mac) ? history.macAndSysupHistoryJson(req.params.mac) : notAvail;
    res.json(response);

});

router.get('/sysup', function (req, res, next) {


});


export default router;
