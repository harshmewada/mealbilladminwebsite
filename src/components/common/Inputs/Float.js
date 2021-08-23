import React from "react";
import InputContainer from "./InputContainer";

const MyTextField = React.forwardRef((props, ref) => {
  const { label, name, placeholder, multiline, rows, error, size } = props;

  return (
    <InputContainer {...props} label={label} error={error} size={size}>
      <input
        ref={ref}
        class="form-control"
        name={name}
        placeholder={placeholder}
        {...props}
        type="number"
        step="0.1"
      />
    </InputContainer>
  );
});
export default MyTextField;
