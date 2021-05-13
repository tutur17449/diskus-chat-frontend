import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Chat from "../../components/Chat";
import socket from "../../lib/socket";
import {
  REMOVE_CURRENT_CONVERSATION,
  SET_NEW_MESSAGE,
  DELETE_MESSAGES,
} from "../../store/messages/messages.slice";
import {
  fetchInitialUsers,
  SET_NEW_USER,
  REMOVE_USER,
} from "../../store/users/users.slice";

const ChatContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialUsers());

    socket.on("userOnline", (user) => {
      dispatch(SET_NEW_USER(user));
    });

    socket.on("userLogout", (user) => {
      dispatch(REMOVE_USER(user));
      dispatch(REMOVE_CURRENT_CONVERSATION(user));
      dispatch(DELETE_MESSAGES(user));
    });

    socket.on("newMessage", (message) => {
      dispatch(SET_NEW_MESSAGE(message));
    });

    return () => {
      socket.off("userOnline");
      socket.off("userLogout");
      socket.off("newMessage");
    };
  }, []);

  return <Chat />;
};

export default ChatContainer;
