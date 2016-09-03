/**
 * Created by thomasnatter on 8/23/16.
 */


const total = {
    macHex: "TOTAL",
    dname: "Total traffic",
    avatar: "img/Wifi.jpg",
    traffic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    lastSeen: null
};

const initialState = {
    targetsLoaded: false,
    returnToLink: '/',
    macHistory: [],
    searchTarget: 'abcdef123456',
    total: total,
    targets: [total],
    hogs: new Map(),
    scannerOn: true
}


function reducer(state = initialState, action) {

    switch (action.type) {
        case "WAKE_UP": {
            return state;
            break;
        }
        case "TARGETS_RECEIVED": {
            return {
                ...state, targets: [...action.payload, state.total],
                targetsLoaded: true
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
            return {...state, macHistory: []}
            break;
        }
        case "HISTORY_RECEIVED": {
            return {...state, macHistory: action.payload}
            break;
        }
        case "ADD_LAST_IN": {
            var newHogs = addLastIn(state.hogs, action.payload);
            return {...state, hogs: newHogs}
            break;
        }
        case "SET_RETURN_TO_LINK": {
            return {...state, returnToLink: action.payload}
            break;
        }
        case "RESET_HOGS": {
            return {...state, hogs: new Map()}
            break;
        }
        return state;
    }
}

export default reducer;


function addLastIn(hogs, justIn) {
    hogs = new Map(hogs);  //clone hogs to maintain immutability
    for (var x in justIn) {
        if (justIn.hasOwnProperty(x)) {
            if (hogs.has(x)) {
                hogs.set(x, hogs.get(x) + parseInt(justIn[x]));
            }
            else {
                hogs.set(x, parseInt(justIn[x]))
            }
        }
    }
    return hogs;
}