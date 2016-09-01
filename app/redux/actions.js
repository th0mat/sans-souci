/**
 * Created by thomasnatter on 8/23/16.
 */


import axios from "axios";
import Config from '../config/config';

var url = Config.url;


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
    return function(sipatch) {
        dispatch({type: 'FETCH_NEW_HISTORY'});
        axioa.get(url + 'api/history/' + this.props.day + "/" + this.props.user)
            .then((response) => response.json())
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

