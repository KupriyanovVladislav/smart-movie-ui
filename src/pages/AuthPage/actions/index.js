import {BASIC_URL} from "../../../constants";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

const loginUserRequest = () => ({
    type: "LOGIN_USER_REQUEST"
});

const loginUserResponse = (user) => ({
    type: "LOGIN_USER_SUCCESS",
    payload: user
});

const loginUserReject = err => ({
    type: "LOGIN_USER_FAILURE",
    payload: err
});

export const loginUser = user => {
  return async dispatch => {
      dispatch(loginUserRequest());
      let response = await fetch(BASIC_URL + 'token-auth/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
      });
      const respBody = await response.json();
      if (response.status === 200) {
          dispatch(loginUserResponse(respBody))
      }
      else {
          dispatch(loginUserReject(respBody));
      }
      return {status: response.status, data: respBody}
  }
};
