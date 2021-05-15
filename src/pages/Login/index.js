import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import FormLogin from "../../components/FormLogin";
import withNoAuth from "../../hoc/withNoAuth";
import Logo from "../../assets/images/logo-dark.png";
import { useEffect } from "react";
import { fetchInitialUsers, SET_NEW_USER } from "../../store/users/users.slice";
import { getUserscount } from "../../store/users/users.selector";
import socket from "../../lib/socket";

const Login = () => {
  const dispatch = useDispatch();
  const usersCount = useSelector(getUserscount);

  useEffect(() => {
    dispatch(fetchInitialUsers());

    socket.on("userOnline", (user) => {
      dispatch(SET_NEW_USER(user));
    });

    return () => {
      socket.off("userOnline");
    };
  }, []);

  return (
    <Container>
      <Row>
        <Col lg="6" className="m-auto pt-3 mb-5">
          <div className="d-flex flex-column align-items-center pb-4 mb-4">
            <img src={Logo} className="logo" alt="Diskus logo" />
            <h1 className="text-center">Welcome to Diskus</h1>
            <p>{usersCount} users online</p>
          </div>
          <h2>Please login</h2>
          <hr />
          <FormLogin />
        </Col>
      </Row>
    </Container>
  );
};

export default withNoAuth(Login);
