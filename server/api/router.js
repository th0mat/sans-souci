"use strict";


import express from 'express';
var router = express.Router();
import * as history from './history.js';
import {getTargetsJson} from './sendConfig';
import promiseTargetsUpdate from './updateTargets';
import calcNotify from './calcNotify'
import * as logSys from './logSys'
import logger from '../log'
import config from '../config'
import path from 'path';
import fs from 'fs';


var ouiPath = path.normalize(__dirname + '/../../server.config/oui.json');
var oui = JSON.parse(fs.readFileSync(ouiPath));
console.log("*** oui length: ", Object.keys(oui).length);

// check if log sys is running
var pid = logSys.getLogSysPid();
if (pid) {
    logger.info("logSys is running with pid " + pid)
} else {
    logger.warn("logSys is not running");
    logSys.turnLogSysOn();
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

router.post('/config/targets', function (req, res, next) {
    promiseTargetsUpdate(req.body.targets)
        .then((result) => {
            logger.warn('targets file was updated');
            res.send(result)
        })
        .catch((error) => {
            logger.error('targets file update failed');
            res.send(error)
        });
});



//export default router.get('/history/:day/:mac', function (req, res, next) {
router.get('/history/:mac', function (req, res, next) {
    var notAvail = JSON.stringify({mac: [], sysup: []});
    var response = history.macSet.has(req.params.mac) ? history.macAndSysupHistoryJson(req.params.mac) : notAvail;
    res.json(response);

});

router.get('/logSysStatus', function (req, res, next) {
    let onOff = logSys.getLogSysPid() ? 'on' : 'off';
    res.json({status: onOff})
});


router.post('/logSysStatus', function (req, res, next) {
    if (req.body.targetStatus === 'on') {
        logSys.turnLogSysOn()
        res.json({status: 'on'})
    }
    if (req.body.targetStatus === 'off') {
        logSys.turnLogSysOff()
        res.json({status: 'off'})
    }
});


router.put('/image', function (req, res, next) {
    let binary = new Buffer(req.body.content, 'base64');
    var imgName = path.normalize(__dirname + '/../../app/img/' + req.body.avatar);
    fs.writeFileSync(imgName, binary);
    res.send('image received');
});


router.get('/config/imageBank', function (req, res, next) {
    var imgBankDir = path.normalize(__dirname + '/../../app/imgBank');
    fs.readdir(imgBankDir, (err, result)=>{
        if (err) {
            res.send('Error retrieving image bank: ' + err.stack);
            return;
        }
        res.send(result);
    });
});

router.get('/config/oui', function (req, res, next) {
    res.json(oui)
});


export default router;
