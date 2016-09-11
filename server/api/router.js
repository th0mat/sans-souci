import express from 'express';
var router = express.Router();
import * as history from './history.js';
import {getTargetsJson} from './sendConfig';


var numberOfDays = 3;
history.fetchHistory(numberOfDays);
history.fetchLastSeen();


// reload iruka.data in 1 minute intervals
setInterval(
    history.fetchHistory.bind(null, numberOfDays)
    , 60000
);
setInterval(
    history.fetchLastSeen
    , 60000
);


router.get('/config/targets', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    var targetsJson = getTargetsJson(history.lastSeen);
    res.send(targetsJson);

});


export default router.get('/history/:day/:mac', function (req, res, next) {
    var notAvail = JSON.stringify({"request result": "no data available"});
    var response = history.macSet.has(req.params.mac) ? history.macAndSysupHistoryJson(req.params.mac) : notAvail;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Content-Type', 'application/json');
    res.json(response);

});


