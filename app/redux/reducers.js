/**
 * Created by thomasnatter on 8/23/16.
 */


const total = {
    macHex: "1000000000000",
    dname: "Total traffic",
    avatar: "img/Wifi.jpg",
    traffic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    lastSeen: null
};

const initialState = {
    targetsLoaded: false,
    returnToLink: '/',
    macHistory: [],
    searchTarget: 'abcdef123456',
    total: total,
    targetsOnly: [],
    targetsOnlyBup: [],
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
                targetsOnly: action.payload,
                targetsOnlyBup: JSON.parse(JSON.stringify(action.payload)),
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
            return state;
            //return {...state, macHistory: []}
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
        case "TOGGLE_NOTIFY_BACK": {
            var t = state.targetsOnly.find((x)=>x.macHex === action.payload)
            t.notifyBack = !t.notifyBack;
            return {...state, targetsOnly: [...state.targetsOnly]}
            break;
        }
        case "TOGGLE_NOTIFY_GONE": {
            var t = state.targetsOnly.find((x)=>x.macHex === action.payload)
            t.notifyGone = !t.notifyGone;
            return {...state, targetsOnly: [...state.targetsOnly]}
            break;
        }
        case "NOTIFY_UPDATED": {
            return state;
            break;
        }
        case "NOTIFY_UPDATE_ERROR": {
            return state;
            break;
        }


        case "CANCEL_NOTIFY_CHANGES": {
            return {...state, targetsOnly: JSON.parse(JSON.stringify(state.targetsOnlyBup))};
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