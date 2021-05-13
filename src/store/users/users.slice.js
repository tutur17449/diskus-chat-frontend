import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../lib/axios";
import { SET_LOADING, SET_COMPLETE } from "../api/api.slice";

const initialState = {
  isInit: false,
  usersList: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    SET_INITIAL_USERS: (state, { payload }) => {
      state.usersList = payload;
      state.isInit = true;
    },
    SET_NEW_USER: (state, { payload }) => {
      state.usersList = [payload, ...state.usersList];
    },
    REMOVE_USER: (state, { payload }) => {
      state.usersList = [
        ...state.usersList.filter((i) => i.socketId !== payload),
      ];
    },
  },
});

export const { SET_INITIAL_USERS, SET_NEW_USER, REMOVE_USER } =
  usersSlice.actions;

export default usersSlice.reducer;

// Thunks
export const fetchInitialUsers = () => async (dispatch, getState) => {
  const { users } = getState();

  if (!users.isInit) {
    dispatch(SET_LOADING("GET_ALL_USERS"));
    try {
      const { data } = await httpClient.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users`
      );
      dispatch(SET_INITIAL_USERS(data.usersList));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(SET_COMPLETE("GET_ALL_USERS"));
    }
  }
};
