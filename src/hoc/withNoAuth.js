import useAuth from "../hooks/useAuth";
import { Redirect } from "react-router-dom";

const withNoAuth = (Component) => (props) => {
  const { user } = useAuth();

  if (user) {
    return <Redirect to="/" />;
  }

  return <Component {...props} />;
};

export default withNoAuth;
