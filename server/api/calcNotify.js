/**
 * Created by thomasnatter on 9/13/16.
 */
"use strict";

import fs from 'fs';
import path from 'path';
import moment from 'moment';

import logger from '../log'

var configNotify = path.normalize(__dirname + '/../../server.config/notify.json');
var configTargets = path.normalize(__dirname + '/../../server.config/targets.json');

var notify, targets;

var sysUpFull = false;

// todo: asyncify
export default function getPendingNotifications(history) {
    var lastSeen = history.lastSeen;
    var prevLastSeen = history.prevLastSeen;
    var notify = JSON.parse(fs.readFileSync(configNotify));
    var targets = JSON.parse(fs.readFileSync(configTargets));
    // console.log(targets);
    var now = Math.floor(Date.now() / 1000);
    now = now - (now % 60) + 60; // put on full min
    for (var t of notify) {
        var msg = "";
        var last = lastSeen.find((e)=> {
            return e[0] === t.macHex
        });
        var prev = prevLastSeen.find((e)=> {
            return e[0] === t.macHex
        });
        if (!last || !prev) continue;
        if (now - last[2] == 600) msg = 'left at ' + moment(last[2] * 1000).format('LT');
        if (last[2] - prev[2] > 600) msg = 'back at ' + moment(last[2] * 1000).format('LT');
        var name;
        if (msg !== "") {
            // get name
            var result = targets.find((x)=>x.macHex === t.macHex)
            if (result == -1) { name = t.macHex; }
            else { name = result.dname; }
            logger.info(name + " " + msg);
        }
    }
}

