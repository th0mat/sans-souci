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
                    var now = moment();
                    let one = moment(x[0] * 1000);
                    return !(now.date() == one.date() && now.hour() < one.hour());
                });
                tmp.mac = tmp.mac.reverse();
                // mark future 5 min slots with -1
                // how many slots to full hour?
                let minNow = moment().minutes();
                let slotsPassed = Math.floor(((minNow)/ 5));
                // mark the remaining slots of the first hour -1
                for (let mark = slotsPassed; mark <= 11; mark++) {

                    tmp.mac[0][1][mark] = tmp.mac[0][1][mark] || -1;
                }
                console.log('tmp.mac[0]: ', tmp.mac[0])
                console.log('slotsPassed ', slotsPassed)

                dispatch({type: "HISTORY_RECEIVED", payload: tmp})
            })
            .catch((error) => {
                console.error(error);
            });
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
                dispatch({type: "TARGETS_RECEIVED", payload: targets})
            })
            .catch((err) => {
                dispatch({type: "TARGET_UPDATE_ERROR", payload: err})
            })
    }
}

export function uploadImage(file, index, targets) {
    return function (dispatch) {
        var reader = new FileReader;
        reader.addEventListener("loadend", function () {
            let base64String = _arrayBufferToBase64(reader.result);
            axios.put(url + 'api/image', {content: base64String, avatar: file.name}, axiosConfigJson)
                .then(function (res) {
                    dispatch({type: "IMAGE_UPLOADED"});
                    targets[index].avatar = 'img/' + file.name;
                    dispatch(postTargetChanges(targets))
                })
                .catch(function (err) {
                    console.log('***** impage upload error: ', err.message);
                });
        });
        reader.readAsArrayBuffer(file);

    };
}


export function getImageBankArray() {
    return function (dispatch) {
        axios.get(url + "api/config/imageBank")
            .then((response) => {
                dispatch({type: "IMAGE_BANK_RECEIVED", payload: response.data})
            })
            .catch((err) => {
                console.log('*** loading of image Bank failed');
            })
    }
}




function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
