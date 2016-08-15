var express = require('express');
var router = express.Router();


router.get('/:day/:mac', function (req, res, next) {

    console.log("about to redirect");
    // res.setHeader('Content-Type', 'application/json');
    res.redirect('/');
    // res.json({
    //     "addr1": "first",
    //     "addr2": "second",
    //     "addr3": "third"
    // });


});

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




module.exports = router;