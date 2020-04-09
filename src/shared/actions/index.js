import {BASIC_URL} from "../../constants";

export const CHANGE_USER_DATA_REQUEST = "CHANGE_USER_DATA_REQUEST";
export const CHANGE_USER_DATA_SUCCESS = "CHANGE_USER_DATA_SUCCESS";
export const CHANGE_USER_DATA_FAILURE = "CHANGE_USER_DATA_FAILURE";
export const CLEAR_USER_DATA = "CLEAR_USER_DATA";

const changeUserRequest = () => ({
    type: CHANGE_USER_DATA_REQUEST
});

export const changeUserSuccess = (user) => ({
    type: CHANGE_USER_DATA_SUCCESS,
    payload: user
});

export const changeUserFailure = (err) => ({
    type: CHANGE_USER_DATA_FAILURE,
    payload: err
});

export const clearUserData = () => ({
    type: CLEAR_USER_DATA
});

export const updateUser = () => {
    return async dispatch => {
        dispatch(changeUserRequest());
        let result = {logged_in: false};
        const token = localStorage.getItem('token');
        if (token) {
            let response = await fetch(BASIC_URL + 'current_user/', {
                headers: {Authorization: `JWT ${token}`},
                method: 'GET'
            });

            const respBody = await response.json();
            if (respBody.hasOwnProperty('email')) {
                dispatch(changeUserSuccess(respBody));
                result.logged_in = true;
            }
            else {
                dispatch(changeUserFailure(respBody));
                localStorage.removeItem('token');
            }
        }
        return result;
    }
};
