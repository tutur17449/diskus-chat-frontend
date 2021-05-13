import ChatConversation from "./ChatConversation";
import ChatNav from "./ChatNav";
import ChatHeader from "./ChatHeader";
import "./styles.scss";
import { useSelector } from "react-redux";
import { getCurrentConversation } from "../../store/messages/messages.selector";

const Chat = () => {
  const currentConversation = useSelector(getCurrentConversation);

  return (
    <div id="chat">
      <div className="p-0 col-left">
        <ChatNav />
      </div>
      <div className="p-0 col-right">
        <ChatHeader />
        {currentConversation && <ChatConversation />}
      </div>
    </div>
  );
};

export default Chat;
