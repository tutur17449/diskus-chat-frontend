const formValidator = (errors, setErros, fields, validateFields) => {
  let flagError = false;
  let newErrors = { ...errors };

  Object.keys(fields).forEach((field) => {
    const error = validateFields(field, fields[field]);
    if (error !== "") {
      flagError = true;
    }

    newErrors = {
      ...newErrors,
      [field]: error,
    };
  });

  setErros(newErrors);

  return flagError;
};

export default formValidator;
