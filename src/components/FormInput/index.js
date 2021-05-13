import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

const FormInput = ({
  label,
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        invalid={error !== "" && true}
      />
      {error !== "" && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
};

export default FormInput;
