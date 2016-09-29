/**
 * Created by thomasnatter on 8/21/16.
 */
"use strict";


import fs from 'fs';
import path from 'path';

var configTargets = path.normalize(__dirname + '/../../server.config/targets.json');



export default function promiseTargetsUpdate(targets) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(configTargets, JSON.stringify(targets), function (err) {
            if (err) reject('save of target data failed');
            else resolve('target data was saved');
        });
    });
}