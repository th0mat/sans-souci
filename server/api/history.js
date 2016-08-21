/**
 * Created by thomasnatter on 8/16/16.
 */
"use strict";

var fs = require('fs');
var path = require('path');
//import moment from 'moment';


var rootDir = path.normalize(__dirname + '/../../iruka.data/');

export var all = 'run fetchHistory() before accessing this property';
export var macSet;

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
    let data = fs.readFileSync(rootDir + logFileDayRel(whichDay));
    console.log("*** loading: ", logFileDayRel(whichDay));
    var array = data.toString().split("\n");
    raw.push.apply(raw, array);

}


function logFileDayRel(daysBeforeToday = 0) {
    var today = new Date();
    var targetDate = new Date(today.setDate(today.getDate() - daysBeforeToday));
    var fileName = "/" + today.toISOString().substr(0, 10) + ".log";
    return fileName;
}


export function fetchHistory(numberOfDays) {
    var raw = [];
    // todo: exception handling for days w/o log file
    for (let i = 0; i < numberOfDays; i++) {
        addDay(i, raw);
    }
    for (let i in raw) {
        //i = i.split(" ");
        raw[i] = raw[i].split(" ");
        raw[i][0] = parseInt(raw[i][0]);
        raw[i][2] = parseInt(raw[i][2]);
    }
    console.log("*** loaded raw records: ", raw.length);

    macSet = new Set();
    var history = new Map();

    // create a set of all mac addresses
    // todo: why is there a null in the result set?
    for (let i of raw) {
        macSet.add(i[1]);
    }
    macSet.delete(undefined);
    macSet.delete(null);

    console.log("*** number of mac addresses: ", macSet.size);

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


export function json(mac) {
    var result = {};
    result.mac = [...all.get(mac).hours];
    result.sysup = [...all.get('1000000000000').hours];
    return JSON.stringify(result);
}
