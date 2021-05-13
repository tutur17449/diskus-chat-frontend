import ChatContainer from "../../containers/chatContainer";
import withAuth from "../../hoc/withAuth";

const Chat = () => {
  return <ChatContainer />;
};

export default withAuth(Chat);
