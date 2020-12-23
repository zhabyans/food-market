import { combineReducers } from "redux";
import { registerReducer, photoReducer } from "./auth";
import { globalReducer } from "./global";
import { homeReducer } from "./home";

const reducer = combineReducers({
  globalReducer,
  registerReducer,
  photoReducer,
  homeReducer,
});

export default reducer;
