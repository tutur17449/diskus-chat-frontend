import useAuth from "../hooks/useAuth";
import { Redirect } from "react-router-dom";

const withAuth = (Component) => (props) => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Component {...props} />;
};

export default withAuth;
