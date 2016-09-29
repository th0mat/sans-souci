/**
 * Created by thomasnatter on 8/21/16.
 */
"use strict";


import fs from 'fs';
import path from 'path';

var configNotify = path.normalize(__dirname + '/../../server.config/notify.json');

function stripTargets(targets){
    var stripped = [];
    for (var t of targets){
        if (t.notifyBack || t.notifyGone) {
            let s = {};
            s.macHex = t.macHex;
            s.notifyGone = t.notifyGone;
            s.notifyBack = t.notifyBack;
            stripped.push(s);
        }
    }
    return stripped;
}

export default function promiseNotifyUpdate(targets) {
    targets = stripTargets(targets);
    return new Promise(function (resolve, reject) {
        fs.writeFile(configNotify, JSON.stringify(targets, null, 4), function (err) {
            if (err) reject('save of notify config data failed');
            else resolve('notify config data was saved');
        });
    });
}