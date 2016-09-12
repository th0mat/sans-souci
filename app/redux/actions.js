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
    return function(dispatch) {
        axios.get(url + "api/config/targets")
            .then((response) => {
                dispatch({type: "TARGETS_RECEIVED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_TARGETS_ERROR", payload: err})
            })
    }
}


export function fetchHistory(mac){
    return function(dispatch) {
        dispatch({type: 'FETCH_NEW_HISTORY'});
        axios.get(url + 'api/history/0/' + mac)
            .then((response) => response.data)
            .then((responseJson) => {
                var tmp = JSON.parse(responseJson);
                tmp.mac = tmp.mac.filter((x)=>{
                    let now = moment();
                    let one = moment(x[0]*1000);
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
    return function(dispatch) {

        axios.post( url + "api/config/updateNotify", {
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
