var express = require('express');
var router = express.Router();


router.get('/:macaddr', function (req, res, next) {
    req.app.iruka.count++;
    res.send("History in the making for " + req.app.iruka.count + " times");
    

});


module.exports = router;