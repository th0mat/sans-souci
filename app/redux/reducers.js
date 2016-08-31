/**
 * Created by thomasnatter on 8/23/16.
 */


const initialState = {
    targetsLoaded: false,
    targets: [{
        macHex: "TOTAL",
        dname: "Total traffic",
        avatar: "img/Wifi.jpg",
        traffic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        lastSeen: null
    }],
    hogs: new Map(), //.set('initial', 1000),
    initial: 'I am part of the inititial state'
}


function reducer(state = initialState, action) {

    switch (action.type) {
        case "WAKE_UP": {
            return state;
            break;
        }
        case "TARGETS_RECEIVED": {
            return {
                ...state, targets: action.payload,
                targetsLoaded: true
            };
            break;
        }
        case "FETCH_TARGETS_ERROR": {
            return {...state, error: action.payload}
            break;
        }
        case "ADD_LAST_IN": {
            var newHogs = addLastIn(state.hogs, action.payload);
            return {...state, hogs: newHogs}
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