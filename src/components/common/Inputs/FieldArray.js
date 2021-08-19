import React from "react";
import InputContainer from "./InputContainer";

const FieldArray = React.forwardRef((props, ref) => {
  const { label, name, placeholder, multiline, rows, error, size } = props;
  return (
    <InputContainer {...props} label={label} error={error} size={size}>
      <input
        ref={ref}
        type="text"
        class="form-control"
        name={name}
        placeholder={placeholder}
        {...props}
      />
    </InputContainer>
  );
});
export default FieldArray;
