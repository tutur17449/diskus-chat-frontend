const requiredFields = ["pseudo"];

const validateFields = (name, value) => {
  if (requiredFields.includes(name) && value.length === 0) {
    return "This field is required";
  }

  return "";
};

export default validateFields;
