/**
 * Created by thomasnatter on 8/23/16.
 */


const totalTraffic = {
    macHex: "1000000000000",
    dname: "Total traffic",
    avatar: "img/Wifi.jpg",
    traffic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    lastSeen: null
};

const initialState = {
    returnToLink: '/',
    macHistory: [],
    sysupHistory: [],
    searchTarget: 'abcdef123456',
    total: totalTraffic,
    targets: [totalTraffic],
    targetsOnly: [],
    scannerOn: true,
    logSysStatus: 'unknown'  // 'unknown', 'on', or 'off'
}


function reducer(state = initialState, action) {

    switch (action.type) {
        case "TARGETS_RECEIVED": {
            return {
                ...state, targets: [...action.payload, state.total],
                targetsOnly: action.payload
            };
            break;
        }
        case "FETCH_TARGETS_ERROR": {
            return {...state, error: action.payload}
            break;
        }
        case "UPDATE_SEARCH_TARGET": {
            return {...state, searchTarget: action.payload}
            break;
        }
        case "FETCH_NEW_HISTORY": {
            return state;
            //return {...state, macHistory: []}
            break;
        }
        case "HISTORY_RECEIVED": {
            return {...state, macHistory: action.payload.mac, sysupHistory: action.payload.sysup};
            break;
        }
        case "SET_RETURN_TO_LINK": {
            return {...state, returnToLink: action.payload}
            break;
        }
        case "IMAGE_UPLOADED": {
            return state;
            break;
        }
        case "LOG_SYS_STATUS_RECEIVED": {
            return {...state, logSysStatus: action.payload.status};
            break;
        }
        case "LOG_SYS_ERROR": {
            return {...state, logSysStatus: 'unknown'};
            break;
        }
        return state;
    }
}

export default reducer;

