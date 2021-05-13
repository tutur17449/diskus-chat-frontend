import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loaders: [],
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    SET_LOADING: (state, { payload }) => {
      state.loaders.push(payload);
    },
    SET_COMPLETE: (state, { payload }) => {
      const tmp = state.loaders.filter((i) => i !== payload);
      state.loaders = tmp;
    },
  },
});

export const { SET_LOADING, SET_COMPLETE } = apiSlice.actions;

export default apiSlice.reducer;
