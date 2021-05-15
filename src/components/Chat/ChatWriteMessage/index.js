import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import useAuth from "../../../hooks/useAuth";
import socket from "../../../lib/socket";
import { getCurrentConversation } from "../../../store/messages/messages.selector";
import "./styles.scss";

const ChatWriteMessage = () => {
  const currentConversation = useSelector(getCurrentConversation);
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const onSendMessage = (e) => {
    if (e.type === "click" || (e.type === "keypress" && e.key === "Enter")) {
      socket.emit("sendMessage", {
        sender: user.socketId,
        receiver: currentConversation.socketId,
        content: message,
        date: new Date(),
      });
      setMessage("");
    }
  };

  return (
    <div id="write-message">
      <input
        placeholder="Your message ..."
        value={message}
        onChange={onChange}
        onKeyPress={onSendMessage}
      />
      <Button color="primary" onClick={onSendMessage}>
        Send
      </Button>
    </div>
  );
};

export default ChatWriteMessage;
