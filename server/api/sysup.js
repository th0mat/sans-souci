/**
 * Created by thomasnatter on 9/24/16.
 */

import child_process from 'child_process';
import logger from '../log'


// returns the pid if log_iruka is running and 0 if not running
export default function logSysPid() {
    try {
        var pid = child_process.execSync("pgrep iruka_log")
        var pidString = pid.toString("utf-8").trim();
        return parseInt(pidString);
    } catch (e) {
        return 0;
    }
}

