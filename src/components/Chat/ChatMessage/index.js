import getDateFormat from "../../../helpers/getDateFormat";
import "./styles.scss";

const ChatMessage = ({ data, isAuthor, currentUser }) => {
  const dt = getDateFormat(data.date);
  return (
    <div className={`message ${isAuthor && "me"}`}>
      <div>
        <h6>{isAuthor ? "me" : currentUser}</h6>
        <span>{dt}</span>
      </div>
      <p> {data.content}</p>
    </div>
  );
};

export default ChatMessage;
