


const initialState = {
    targets: [],
    initial: 'I am part of the inititial state'
}


function reducer(state=initialState, action) {

    switch (action.type) {
        case "WAKE_UP": {
            return state;
            break;
        }
        case "TARGETS_RECEIVED": {
            return {...state, targets: action.payload};
            break;
        }
        case "FETCH_TARGETS_ERROR": {
            return {...state, error : action.payload }
            break;
        }
            return state;
    }
}

export default reducer;
