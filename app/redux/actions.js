/**
 * Created by thomasnatter on 8/23/16.
 */


import axios from "axios";

var url = "http://171.101.236.255:3000/";


export function fetchConfig() {
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

