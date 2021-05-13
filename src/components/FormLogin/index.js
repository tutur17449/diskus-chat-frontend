import { useEffect, useState } from "react";
import { Button, Form, Alert } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import formValidator from "../../helpers/formValidator";
import formFieldValidator from "../../helpers/formFieldValidator";
import validateFields from "./formLogin.validator";
import { useHistory } from "react-router";
import FormInput from "../FormInput";
import socket from "../../lib/socket";
import Logo from "../../assets/images/logo-dark.png";
import "./styles.scss";

const FormLogin = () => {
  const { setUser } = useAuth();
  const history = useHistory();
  const [globalError, setGlobalError] = useState(null);
  const [formData, setFormData] = useState({
    pseudo: "",
  });
  const [formError, setFormError] = useState({
    pseudo: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      pseudo: value,
    });
    formFieldValidator(name, value, validateFields, setFormError, formError);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validation = formValidator(
      formError,
      setFormError,
      formData,
      validateFields
    );

    if (!validation) {
      socket.emit("userLogin", formData.pseudo);
    }
  };

  useEffect(() => {
    socket.on("userOnline", (user) => {
      if (user.username === formData.pseudo) {
        setUser(user);
        history.push("/");
      }
    });

    socket.on("socketError", (error) => {
      setGlobalError(error);
    });

    return () => {
      socket.off("userOnline");
      socket.off("socketError");
    };
  }, [formData.pseudo]);

  return (
    <>
      <div className="d-flex flex-column align-items-center pb-4 mb-4">
        <img src={Logo} className="logo" alt="Diskus logo" />
        <h1 className="text-center">Welcome to Diskus</h1>
      </div>
      <h2>Please login</h2>
      <hr />
      {globalError && (
        <Alert
          color="danger"
          isOpen={globalError}
          toggle={() => setGlobalError(null)}
        >
          {globalError}
        </Alert>
      )}
      <Form onSubmit={onSubmit} className="mt-5">
        <FormInput
          label="Pseudo"
          type="text"
          name="pseudo"
          id="pseudo"
          placeholder="johnDoe"
          value={formData.pseudo}
          onChange={onChange}
          error={formError.pseudo}
        />
        <Button type="submit" className="w-100 mt-5" color="primary">
          Login
        </Button>
      </Form>
    </>
  );
};

export default FormLogin;
