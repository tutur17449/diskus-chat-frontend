const formFieldValidator = (name, value, validateFields, setErrors, errors) => {
  const error = validateFields(name, value);
  setErrors({
    ...errors,
    [name]: error,
  });
};

export default formFieldValidator;
