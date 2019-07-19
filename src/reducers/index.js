import { combineReducers } from "redux";
import { messageReducer } from "./messages";
import { inputReducer } from "./input";
import { loginReducer } from "./login";
import { usersReducer } from "./users";

export const rootReducer = combineReducers({
  message: messageReducer,
  input: inputReducer,
  login: loginReducer,
  users: usersReducer
});
