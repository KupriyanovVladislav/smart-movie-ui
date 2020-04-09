import {combineReducers} from "redux";
import {authReducer} from "../pages/AuthPage/reducers";
import {registerReducer} from "../pages/RegisterPage/reducers";
import {sharedReducer} from "../shared/reducers";

export const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    shared: sharedReducer,
});