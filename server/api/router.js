import express from 'express';
var router = express.Router();
import * as history from './history.js';


var numberOfDays = 3;


history.fetchHistory(numberOfDays);
history.fetchLastSeen();
//console.log(history.json("1000000000000"));


import targets from './config.targets';
var targetsJson = targets();


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
    targetsJson = addLastSeen(targetsJson);
    console.log(targetsJson);
    res.send(targetsJson);

});


export default router.get('/history/:day/:mac', function (req, res, next) {
    var notAvail = JSON.stringify({"request result": "no data available"});
    var response = history.macSet.has(req.params.mac) ? history.json(req.params.mac) : notAvail;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Content-Type', 'application/json');
    res.json(response);

});


function addLastSeen(targets) {
    var all = history.lastSeen;
    for (let i in targets) {
        let found = all.find((x)=>x[0] == targets[i].macHex);
        if (found) targets[i].lastSeen = found[2] * 1000;
    }
    return targets;
}