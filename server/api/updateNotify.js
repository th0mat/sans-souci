/**
 * Created by thomasnatter on 8/21/16.
 */
"use strict";


import fs from 'fs';
import path from 'path';

var configFile = path.normalize(__dirname + '/../../server.config/targets.json');

function getTargetsFile() {
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

export default function updateNotify(targets){
    console.log("*** targets file received via post: ", targets);
    return '*** coolerest ***';
}