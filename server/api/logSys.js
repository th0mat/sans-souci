/**
 * Created by thomasnatter on 9/24/16.
 */

import child_process from 'child_process';
import logger from '../log'
import config from '../config'

// returns the pid if log_iruka is running and 0 if not running
export function getLogSysPid() {
    try {
        var pid = child_process.execSync("pgrep iruka_log")
        var pidString = pid.toString("utf-8").trim();
        return parseInt(pidString);
    } catch (e) {
        return 0;
    }
}

export function turnLogSysOn(){
    let check = getLogSysPid();
    if (check) logger.warn(config.irukaLogExecutable + " is already running"); // runnning already
    try {
        child_process.exec(config.irukaDir + config.irukaLogExecutable)
        logger.info('logSys started with pid ' + getLogSysPid())
    } catch (e) {
        logger.warn('problem turning on ' + config.irukaLogExecutable + " err msg: " + e)
    }
}


export function turnLogSysOff(){
    let pid = getLogSysPid();
    if (!pid) logger.warn(config.irukaLogExecutable + " was not running");
    try {
       child_process.exec("kill " + pid)
    } catch (e) {
        logger.warn('problem turning off ' + config.irukaLogExecutable + " err msg: " + e)
    }
}