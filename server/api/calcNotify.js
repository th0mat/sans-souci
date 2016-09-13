/**
 * Created by thomasnatter on 9/13/16.
 */

import fs from 'fs';
import path from 'path';
import moment from 'moment';

var configNotify = path.normalize(__dirname + '/../../server.config/notify.json');


var sysUpFull = false;

export default function getPendingNotifications(history) {
    var lastSeen = history.lastSeen;
    var prevLastSeen = history.prevLastSeen;
    var notify = JSON.parse(fs.readFileSync(configNotify));
    // if (notify === []) return [];
    // if (!sysUpFull) return [];
    var pending = [];
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
        if (now - last[2] == 600) msg = 'gone since ' + moment(last[2] * 1000).format('LT');
        if (last[2] - prev[2] > 600) msg = 'back at ' + moment(last[2] * 1000).format('LT');
        if (msg !== "") {
            console.log("+++ mac: " + t.macHex + "  prev: " + prev[2] + " last: " + last[2] + "  msg: " + msg);
        }
    }
}

