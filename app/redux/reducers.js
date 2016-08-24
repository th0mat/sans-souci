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
            return state;
    }
}

export default reducer;
