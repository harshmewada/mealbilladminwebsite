import React from "react";
import InputContainer from "./InputContainer";

const MyTextField = React.forwardRef((props, ref) => {
  const { label, name, placeholder, multiline, rows, error, size } = props;
  return (
    <InputContainer label={label} error={error} size={size}>
      <textarea
        ref={ref}
        type="text"
        class="form-control"
        name={name}
        placeholder={placeholder}
        {...props}
        rows={props.rows || 2}
      />
    </InputContainer>
  );
});
export default MyTextField;
