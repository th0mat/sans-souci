/**
 * Created by thomasnatter on 8/23/16.
 */


import axios from "axios";
import Config from '../config/config';
import moment from 'moment'
var url = Config.url;
var axiosConfigJson = {
    headers: {'Content-Type': 'application/json'}
};


export function fetchTargets() {
    return function (dispatch) {
        axios.get(url + "api/config/targets")
            .then((response) => {
                dispatch({type: "TARGETS_RECEIVED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_TARGETS_ERROR", payload: err})
            })
    }
}


export function fetchHistory(mac) {
    return function (dispatch) {
        dispatch({type: 'FETCH_NEW_HISTORY'});
        axios.get(url + 'api/history/' + mac)
            .then((response) => response.data)
            .then((responseJson) => {
                var tmp = JSON.parse(responseJson);
                tmp.mac = tmp.mac.filter((x)=> {
                    let now = moment();
                    let one = moment(x[0] * 1000);
                    return !(now.date() == one.date() && now.hour() < one.hour());
                });
                tmp.mac = tmp.mac.reverse();
                dispatch({type: "HISTORY_RECEIVED", payload: tmp.mac})
            })
            .catch((error) => {
                console.error(error);
            });
    }
}


export function postNotifyChanges(targets) {
    return function (dispatch) {
        axios.post(url + "api/config/updateNotify", {
            targets: targets
        }, axiosConfigJson)
            .then((response) => {
                console.log(response);
                dispatch({type: "NOTIFY_UPDATED", payload: response})
            })
            .catch((err) => {
                dispatch({type: "NOTIFY_UPDATE_ERROR", payload: err})
            })
    }
}

export function getLogSysStatus() {
    return function (dispatch) {
        axios.get(url + "api/logSysStatus")
            .then((response) => {
                dispatch({type: "LOG_SYS_STATUS_RECEIVED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "LOG_SYS_ERROR", payload: err})
            })
    }
}

export function switchLogSys(onOff) {
    return function (dispatch) {
        axios.post(url + "api/logSysStatus", {
            targetStatus: onOff
        }, axiosConfigJson)
            .then((response) => {
                dispatch({type: "LOG_SYS_STATUS_RECEIVED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "LOG_SYS_ERROR", payload: err})
            })
    }
}

export function postTargetChanges(targets) {
    return function (dispatch) {
        axios.post(url + "api/config/targets", {
            targets: targets
        }, axiosConfigJson)
            .then((response) => {
                console.log("***** target update response: ", response);
                dispatch({type: "TARGETS_RECEIVED", payload: targets})
            })
            .catch((err) => {
                dispatch({type: "TARGET_UPDATE_ERROR", payload: err})
            })
    }
}

export function upoadImage(data) {
    axios.put(url + 'api/server', data, config)
        .then(function (res) {
            console.log('***** image upload result: ', res.data);
        })
        .catch(function (err) {
            console.log('***** impage upload error: ', err.message) ;
        });
};