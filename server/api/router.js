import express from 'express';
var router = express.Router();



var numberOfDays = 3;



import * as history from './history.js';
history.fetchHistory(numberOfDays);
console.log(history.json("1000000000000"));


import targets from './config.targets';
var targetsJson = targets();




// reload iruka.data in 1 minute intervals
setInterval(
    history.fetchHistory.bind(null, numberOfDays)
    , 60000
);

router.get('/config/targets', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.send(targetsJson);

});



export default router.get('/history/:day/:mac', function (req, res, next) {
    var notAvail = JSON.stringify({ "request result" : "no data available" });
    var response = history.macSet.has(req.params.mac) ? history.json(req.params.mac) : notAvail;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Content-Type', 'application/json');
    res.json(response);

});


