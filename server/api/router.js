import express from 'express';
var router = express.Router();



function logFileDayRel(daysBeforeToday = 0) {
    var today = new Date();
    var targetDate = new Date(today.setDate(today.getDate() - daysBeforeToday));
    var fileName = today.toISOString().substr(0, 10) + ".log";
    return fileName;
}

function getData(){
    return JSON.stringify({
        "addr1": "first",
        "addr2": "second",
        "addr3": "third"
    })
}


export default router.get('/history/:day/:mac', function (req, res, next) {
    console.log('now inside the api/router.js and /:day/:mac')

    res.setHeader('Content-Type', 'application/json');
    res.json({
        "addr1": "first",
        "addr2": "second",
        "addr3": "third"
    });

});
