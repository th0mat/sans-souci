/**
 * Created by thomasnatter on 8/16/16.
 */
"use strict";
//to allow async await
import "babel-core/register";
import "babel-polyfill";


import moment from 'moment';

import fs from 'fs';
import path from 'path';

import logger from '../log'

var rootDir = path.normalize(__dirname + '/../../iruka.data/');

export var all = 'run fetchHistory() before accessing this property';
export var macSet;
export var lastSeen = [];
export var prevLastSeen = [];

class HourMap {

    getFirstTs() {
        var nowDate = new Date();
        var firstHourToday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0);
        var firstHour = new Date(firstHourToday.getTime() - ( 48 * 3600 * 1000 ));
        return firstHour.getTime() / 1000;
    }

    constructor(date) {
        this.hours = new Map();
        this.firstHour = this.getFirstTs();
        for (let i = 0; i < 72; i++) {
            this.hours.set(this.firstHour + i * 3600, Array(12).fill(0));
        }
    }
}


////////// load files

function addDay(whichDay, raw) {
    var fileName = rootDir + logFileDayRel(whichDay);
    try {
        var data = fs.readFileSync(fileName);
    } catch (e) {
        logger.warn("could not load file ", fileName);
        return;
    }
    var array = data.toString().split("\n");
    raw.push.apply(raw, array);

}


function logFileDayRel(daysBeforeToday = 0) {
    var day = moment().subtract(daysBeforeToday, 'days');
    var fileName = day.format("YYYY-MM-DD") + ".log";
    return fileName;
}


export var fetchLastSeen = async function() {
    var fileName = rootDir + "allStations.log";
    try {
        var data = await promiseFileRead(fileName);
    } catch (e) {
        logger.warn("could not load file ", fileName);
        return;
    }
    data = data.toString().split("\n");
    for (let i in data) {
        data[i] = data[i].split(" ");
        data[i][1] = parseInt(data[i][1]);
        data[i][2] = parseInt(data[i][2]);
    }
    logger.info("number of mac addresses in allMacs: ", data.length);
    prevLastSeen = (lastSeen.length === 0) ? data : lastSeen.slice(0);
    lastSeen = data;
}


function processRaw(raw) {
    for (let i in raw) {
        raw[i] = raw[i].split(" ");
        raw[i][0] = parseInt(raw[i][0]);
        raw[i][2] = parseInt(raw[i][2]);
    }
    logger.info("minute records loaded: ", raw.length);

    macSet = new Set();
    var history = new Map();

    // create a set of all mac addresses
    // todo: why is there a null in the result set?
    for (let i of raw) {
        macSet.add(i[1]);
    }
    macSet.delete(undefined);
    macSet.delete(null);

    logger.info("number of unique mac addresses: ", macSet.size);

    // add empty hourMaps to macMap
    for (let i of macSet) {
        history.set(i, new HourMap());
    }

    // create empty map based on set
    var fullHour, intervall;
    for (let i in raw) {
        let n = raw[i][0] - 1; // -1 so :00 min traffic is correctly added to previous hour
        fullHour = n - (n % 3600);
        intervall = Math.floor(((n % 3600) / 60) / 5);
        try {
            history.get(raw[i][1]).hours.get(fullHour)[intervall] += raw[i][2];
        } catch (e) {
        }
    }
    all = history;
    return history;
}


export function showSet() {
    for (let k of all.keys()) {
        console.log("k: ", k);
    }
}


export function macAndSysupHistoryJson(mac) {
    var result = {};
    result.mac = [...all.get(mac).hours];
    result.sysup = [...all.get('1000000000000').hours];
    return JSON.stringify(result);
}


function promiseFileRead(fn) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fn, function (err, text) {
            if (err) reject(`reading of ${fn} failed - ${err}`);
            else resolve(text);
        });
    });
}


function processText(raw, text) {
    var data = text.toString().split("\n");
    raw.push.apply(raw, data);
}

// todo: change to async await to simplify
export function fetchHistoryAsync() {
    var names = [rootDir + logFileDayRel(0), rootDir + logFileDayRel(1), rootDir + logFileDayRel(2)];
    var p1 = promiseFileRead(names[0]);
    var p2 = promiseFileRead(names[1]);
    var p3 = promiseFileRead(names[2]);
    var raw = [];
    p1
        .then((text)=> {
            processText(raw, text);
            p2
                .then((text)=> {
                    processText(raw, text);
                    p3
                        .then((text)=> {
                            processText(raw, text);
                            processRaw(raw);
                        })
                        .catch((e)=> {
                            logger.warn("--- problem loading file 3: ", e);
                            processRaw(raw)
                        })
                })
                .catch((e)=> {
                    logger.warn("--- problem loading file 2: ", e)
                    p3
                        .then((text)=> {
                            processText(raw, text);
                            processRaw(raw);
                        })
                        .catch((e)=> {
                            logger.warn("--- problem loading file 3: ", e);
                            processRaw(raw);
                        })

                })
        })
        .catch((e)=> {
            logger.warn("--- problem loading file 1: ", e);
            p2
                .then((text)=> {
                    processText(raw, text);
                    p3
                        .then((text)=> {
                            processText(raw, text)
                            processRaw(raw);

                        })
                        .catch((e)=> {
                            logger.warn("--- problem loading file 3: ", e)
                            processRaw(raw);
                        })

                })
                .catch((e)=> {
                    logger.warn("--- problem loading file 2: ", e)
                    p3
                        .then((text)=> {
                            processText(raw, text);
                            processRaw(raw);
                        })
                        .catch((e)=> {
                            logger.warn("--- problem loading file 3: ", e)
                            processRaw(raw);

                        })
                })
        })
}


// var test = async function() {
//     try {
//         var p = await promiseFileRead(rootDir + logFileDayRel(0))
//         console.log("--- async await test, string length: ", p.toString().length);
//     } catch (e) {
//         console.log(e)
//     }
//     // let url = 'http://api.icndb.com/jokes/random';
//     // let response = await "string";
// }
//
// test();
//
