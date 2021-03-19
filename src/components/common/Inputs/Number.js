import React from "react";
import InputContainer from "./InputContainer";

const MyTextField = React.forwardRef((props, ref) => {
  const { label, name, placeholder, multiline, rows, error } = props;
  return (
    <InputContainer label={label} error={error}>
      <input
        ref={ref}
        type="number"
        class="form-control"
        name={name}
        placeholder={placeholder}
        {...props}
      />
    </InputContainer>
  );
});
export default MyTextField;
