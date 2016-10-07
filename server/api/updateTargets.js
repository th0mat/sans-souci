/**
 * Created by thomasnatter on 8/21/16.
 */
"use strict";


import fs from 'fs';
import path from 'path';

var configTargets = path.normalize(__dirname + '/../../server.config/targets.json');


export default function promiseTargetsUpdate(targets) {
    targets = stripTargets(targets);
    return new Promise(function (resolve, reject) {
        fs.writeFile(configTargets, JSON.stringify(targets, null, 4), function (err) {
            if (err) reject('save of target data failed');
            else resolve('target data was saved');
        });
    });
}

function stripTargets(targets) {
    var stripped = [];
    for (var t of targets) {
        let s = {};
        s.macHex = t.macHex;
        s.dname = t.dname;
        s.avatar = t.avatar;
        s.notifyGone = t.notifyGone;
        s.notifyBack = t.notifyBack;
        s.sortOrder = t.sortOrder;
        stripped.push(s);
    }
    return stripped;
}

