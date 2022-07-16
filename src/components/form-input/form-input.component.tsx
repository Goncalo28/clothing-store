import { FormInputLabel, Group, Input } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }: any) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
