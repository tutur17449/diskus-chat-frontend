import { Container, Row, Col } from "reactstrap";
import FormLogin from "../../components/FormLogin";
import withNoAuth from "../../hoc/withNoAuth";

const Login = () => {
  return (
    <Container>
      <Row>
        <Col lg="6" className="m-auto pt-3 mb-5">
          <FormLogin />
        </Col>
      </Row>
    </Container>
  );
};

export default withNoAuth(Login);
