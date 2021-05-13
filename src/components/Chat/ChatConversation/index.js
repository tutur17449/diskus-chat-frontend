import { useSelector } from "react-redux";
import {
  getCurrentConversation,
  getMessages,
} from "../../../store/messages/messages.selector";
import ChatMessage from "../ChatMessage";
import ChatWriteMessage from "../ChatWriteMessage";
import "./styles.scss";

const ChatConversation = () => {
  const currentUser = useSelector(getCurrentConversation);
  const messages = useSelector(getMessages(currentUser.socketId));

  return (
    <div id="chat-conversation">
      <div id="chat-messages-container">
        {messages.map((i, id) => (
          <ChatMessage
            key={id}
            data={i}
            isAuthor={currentUser.socketId === i.receiver}
            currentUser={currentUser.username}
          />
        ))}
      </div>
      <ChatWriteMessage />
    </div>
  );
};

export default ChatConversation;
