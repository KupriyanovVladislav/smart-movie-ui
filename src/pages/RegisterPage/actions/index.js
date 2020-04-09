import {BASIC_URL} from "../../../constants";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

const registerUserRequest = () => ({
    type: REGISTER_USER_REQUEST
});

const registerUserSuccess = (user) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
});

const registerUserFailure = (err) => ({
    type: REGISTER_USER_FAILURE,
    payload: err
});

export const registerUser = (user) => {
    return async dispatch => {
        dispatch(registerUserRequest());
        let response = await fetch(BASIC_URL+'users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const respBody = await response.json();
        if (response.status === 201) {
            dispatch(registerUserSuccess(respBody));
        }
        else if (response.status === 400) {
            dispatch(registerUserFailure(respBody));
        }
        return {status: response.status, data: respBody};
    }
};

