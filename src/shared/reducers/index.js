import {
    CHANGE_USER_DATA_FAILURE,
    CHANGE_USER_DATA_SUCCESS,
    CHANGE_USER_DATA_REQUEST,
    CLEAR_USER_DATA
} from "../actions";

const defaultState = {
    user: {
        email: null,
        status: 'offline'
    },
    userUpdate: {
        aborted: false,
        loading: false,
        error: '',
    }
};

export const sharedReducer = (state=defaultState, action) =>{
    switch (action.type) {
        case CHANGE_USER_DATA_REQUEST:
            return {...state, userUpdate: {loading: true, aborted: false, error: false}};
        case CHANGE_USER_DATA_SUCCESS:
            return {...state, user: action.payload};
        case CHANGE_USER_DATA_FAILURE:
            return {...state, userUpdate: {aborted: true, loading: false, error: action.payload}};
        case CLEAR_USER_DATA:
            return {...state, user: {email: null}};
        default:
            return state
    }
};