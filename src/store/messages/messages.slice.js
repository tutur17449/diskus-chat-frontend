import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentConversation: null,
  messagesList: [],
  notificationsList: {},
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    SET_CURRENT_CONVERSATION: (state, { payload }) => {
      if (state.notificationsList.hasOwnProperty(payload.socketId)) {
        delete state.notificationsList[payload.socketId];
      }
      state.currentConversation = payload;
    },
    REMOVE_CURRENT_CONVERSATION: (state, { payload }) => {
      if (state.currentConversation?.socketId === payload) {
        state.currentConversation = null;
      }
    },
    SET_NEW_MESSAGE: (state, { payload }) => {
      if (payload.sender !== state.currentConversation?.socketId) {
        if (state.notificationsList.hasOwnProperty(payload.sender)) {
          state.notificationsList[payload.sender] =
            state.notificationsList[payload.sender] + 1;
        } else {
          state.notificationsList = {
            ...state.notificationsList,
            [payload.sender]: 1,
          };
        }
      }
      state.messagesList = [payload, ...state.messagesList];
    },
    DELETE_MESSAGES: (state, { payload }) => {
      state.messagesList = state.messagesList.filter(
        (i) => i.sender !== payload && i.receiver !== payload
      );
    },
  },
});

export const {
  SET_CURRENT_CONVERSATION,
  REMOVE_CURRENT_CONVERSATION,
  SET_NEW_MESSAGE,
  DELETE_MESSAGES,
} = messagesSlice.actions;

export default messagesSlice.reducer;
