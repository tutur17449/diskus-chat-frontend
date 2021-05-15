import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { getLoading } from "../../../store/api/api.selectors";
import {
  getCurrentConversation,
  getNotifications,
} from "../../../store/messages/messages.selector";
import { SET_CURRENT_CONVERSATION } from "../../../store/messages/messages.slice";
import { getUsers } from "../../../store/users/users.selector";
import ChatUserCard from "../ChatUserCard";
import "./styles.scss";

const ChatNav = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading("GET_ALL_USERS"));
  const currentConversation = useSelector(getCurrentConversation);
  const notifications = useSelector(getNotifications);

  const users = useSelector(getUsers);
  const { user } = useAuth();

  const setCurrentConversation = (user) => {
    dispatch(SET_CURRENT_CONVERSATION(user));
  };

  return (
    <div id="chat-navigation">
      <section>
        <h2>{`Welcome ${user.username}`}</h2>
        <span>{users.length} users online</span>
      </section>
      <nav className="mt-2">
        {isLoading ? (
          <p>Loading ...</p>
        ) : users.length === 0 ? (
          <p>No user connected</p>
        ) : (
          users.map((i, id) => (
            <ChatUserCard
              data={i}
              key={id}
              me={i.username === user.username}
              currentConversation={currentConversation}
              onClick={setCurrentConversation}
              notifications={notifications[i.socketId]}
            />
          ))
        )}
      </nav>
    </div>
  );
};

export default ChatNav;
