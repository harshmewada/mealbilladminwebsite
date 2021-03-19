import React from "react";
import InputContainer from "./InputContainer";

const MyTextField = React.forwardRef((props, ref) => {
  const { label, name, placeholder, multiline, rows, error } = props;
  return (
    <InputContainer label={label} error={error}>
      <input
        ref={ref}
        type="file"
        class="form-control custom-file-input "
        id="customFile"
        name={name}
        placeholder={placeholder}
        {...props}
      />
      <label class="custom-file-label" for="customFile">
        Choose file
      </label>
    </InputContainer>
  );
});
export default MyTextField;
