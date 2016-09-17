/**
 * Created by thomasnatter on 9/15/16.
 */
'use strict';

import winston from 'winston';
import fs from 'fs';

const env = process.env.NODE_ENV || 'development';

const tsFormat = function(){ return new Date().toLocaleTimeString(); }

const logDir = 'log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}





const logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: 'info'
        }),
        new (winston.transports.File)({
            filename: `${logDir}/results.log`,
            timestamp: tsFormat,
            json: false,
            level: 'silly'
        })
    ]
});

export default logger;