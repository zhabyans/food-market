import { combineReducers } from "redux";
import { registerReducer } from "./auth";
import { globalReducer } from "./global";

const reducer = combineReducers({ globalReducer, registerReducer });

export default reducer;
