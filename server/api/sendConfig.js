/**
 * Created by thomasnatter on 8/21/16.
 */
"use strict";


import fs from 'fs';
import path from 'path';

var configFile = path.normalize(__dirname + '/../../server.config/targets.json');

export function getTargetsFile() {
    try {
        var data = fs.readFileSync(configFile);
    } catch (e) {
        console.log("*** could not load config file ", configFile);
        console.log("*** error message ", e.stack);
        return;
    }
    try {
        var targetsJson = JSON.parse(data);
    } catch (e) {
        consoloe.log("*** config file is not valid JSON\ncheck file ", configFile);
        return;
    }
    return targetsJson;
}

export function addLastSeen(targets, lastSeen) {
    var all = lastSeen;
    for (let i in targets) {
        let found = all.find((x)=>x[0] == targets[i].macHex);
        if (found) targets[i]['lastSeen'] = found[2] * 1000;
        else targets[i]['lastSeen'] = null;
    }
    return targets;
}

function addTrafficArray(targets){
    for (let i = 0; i < targets.length; i++){
        targets[i]['traffic'] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    return targets;

}

export function getTargetsJson(history){
    var targets = getTargetsFile();
    targets = addTrafficArray(targets);
    targets = addLastSeen(targets, history);
    return targets;

}
