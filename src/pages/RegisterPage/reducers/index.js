import {
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST
} from "../actions";

const defaultState = {
    registerStatus: {
        aborted: false,
        loading: false,
        err: ''
    },
    response: {}
};

export const registerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {...state, registerStatus: {aborted: false, loading: true, err: ''}};
        case REGISTER_USER_SUCCESS:
            return {response: action.payload, registerStatus: {aborted: false, loading: false, err: ''}};
        case REGISTER_USER_FAILURE:
            return {...state, registerStatus: {aborted: true, loading: false, err: action.payload}};
        default:
            return state;
    }
};