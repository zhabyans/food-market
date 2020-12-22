import { combineReducers } from "redux";
import { registerReducer, photoReducer } from "./auth";
import { globalReducer } from "./global";

const reducer = combineReducers({
  globalReducer,
  registerReducer,
  photoReducer,
});

export default reducer;
