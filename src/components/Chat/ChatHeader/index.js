import { useSelector } from "react-redux";
import { getCurrentConversation } from "../../../store/messages/messages.selector";
import "./styles.scss";

const ChatHeader = () => {
  const currentConversation = useSelector(getCurrentConversation);

  return (
    <div id="chat-header">
      {!currentConversation ? (
        <h3>Any active conversation</h3>
      ) : (
        <h3>Your conversation with : {currentConversation.username}</h3>
      )}
    </div>
  );
};

export default ChatHeader;
