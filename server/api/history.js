/**
 * Created by thomasnatter on 8/16/16.
 */
"use strict";

import moment from 'moment';

var fs = require('fs');
var path = require('path');



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
        console.log("*** could not load file ", fileName);
        return;
    }
    //console.log("*** loading: ", logFileDayRel(whichDay));
    var array = data.toString().split("\n");
    raw.push.apply(raw, array);

}


function logFileDayRel(daysBeforeToday = 0) {
    var day = moment().subtract(daysBeforeToday, 'days');
    var fileName = day.format("YYYY-MM-DD") + ".log";
    return fileName;
}

export function fetchLastSeen(){
    var fileName = rootDir + "allStations.log";
    try {
        var data = fs.readFileSync(fileName);
    } catch (e) {
        console.log("*** could not load file ", fileName);
        return;
    }
    data = data.toString().split("\n");
    for (let i in data) {
        data[i] = data[i].split(" ");
        data[i][1] = parseInt(data[i][1]);
        data[i][2] = parseInt(data[i][2]);
    }
    prevLastSeen = (lastSeen.length === 0) ? data : lastSeen.slice(0);
    lastSeen = data;
    //console.log("*** allStations lastSeen loaded");
}


export function fetchHistory(numberOfDays) {
    var ts = Date.now();
    var raw = [];
    for (let i = 0; i < numberOfDays; i++) {
        addDay(i, raw);
    }
    for (let i in raw) {
        raw[i] = raw[i].split(" ");
        raw[i][0] = parseInt(raw[i][0]);
        raw[i][2] = parseInt(raw[i][2]);
    }
    console.log("*** raw records loaded: ", raw.length);

    macSet = new Set();
    var history = new Map();

    // create a set of all mac addresses
    // todo: why is there a null in the result set?
    for (let i of raw) {
        macSet.add(i[1]);
    }
    macSet.delete(undefined);
    macSet.delete(null);

    console.log("*** number of unique mac addresses: ", macSet.size);

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

    console.log("*** loading time: " + (Date.now() - ts) + " ms");
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
