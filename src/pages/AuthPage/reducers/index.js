import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE
} from "../actions/index";

const defaultState = {
    loginStatus: {
        aborted: false,
        error: "",
        loading: false
    },
    response: {}
};


export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return {...state, ...{loginStatus: {aborted: false, error: '', loading: true}}};
        case LOGIN_USER_SUCCESS:
            return {...state, ...{loginStatus: {aborted: false, loading: false}}, response: action.payload};
        case LOGIN_USER_FAILURE:
            return {...state, ...{loginStatus: {aborted: true, loading: false}}};
        default:
            return state
    }
};