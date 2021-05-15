import { Badge } from "reactstrap";
import "./styles.scss";

const ChatUserCard = ({
  data,
  me,
  onClick,
  currentConversation,
  notifications,
  resetCurrentConversation,
}) => {
  if (me) {
    return (
      <>
        <div className="user-card" onClick={resetCurrentConversation}>
          <span>{data.username} (me)</span>
        </div>
        <hr />
      </>
    );
  }

  return (
    <>
      <div
        className={`user-card ${
          currentConversation?.username === data.username && "current"
        }`}
        onClick={() => onClick(data)}
      >
        <span>{data.username}</span>
        {notifications && <Badge color="primary">{notifications}</Badge>}
      </div>
      <hr />
    </>
  );
};

export default ChatUserCard;
