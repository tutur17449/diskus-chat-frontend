import { useEffect, useState } from "react";
import { Button, Form, Alert } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import formValidator from "../../helpers/formValidator";
import formFieldValidator from "../../helpers/formFieldValidator";
import validateFields from "./formLogin.validator";
import { useHistory } from "react-router";
import FormInput from "../FormInput";
import socket from "../../lib/socket";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { SET_NEW_USER } from "../../store/users/users.slice";

const FormLogin = () => {
  const dispatch = useDispatch();
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
        dispatch(SET_NEW_USER(user));
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
