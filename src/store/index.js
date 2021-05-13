import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import users from "./users/users.slice";
import messages from "./messages/messages.slice";
import api from "./api/api.slice";

const reducer = combineReducers({
  messages,
  users,
  api,
});

const store = configureStore({ reducer, devTools: true, middleware: [thunk] });

export default store;
