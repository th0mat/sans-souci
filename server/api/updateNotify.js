/**
 * Created by thomasnatter on 8/21/16.
 */
"use strict";


import fs from 'fs';
import path from 'path';

var configNotify = path.normalize(__dirname + '/../../server.config/notify.json');



export default function promiseNotifyUpdate(targets) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(configNotify, JSON.stringify(targets), function (err) {
            if (err) reject('save of notify config data failed');
            else resolve('notify config data was saved');
        });
    });
}