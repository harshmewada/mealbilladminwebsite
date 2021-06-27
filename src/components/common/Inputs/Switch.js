import React from "react";
import InputContainer from "./InputContainer";

const Switch = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    placeholder,
    multiline,
    rows,
    error,
    size,
    onChange,
    value,
    defaultValue,
  } = props;
  return (
    <InputContainer {...props} label={" "} error={error} size={size}>
      <div class="custom-control custom-switch switch-primary">
        <input
          class="custom-control-input form-control"
          id="customSwitchPrimary"
          ref={ref}
          // {...props}
          name={name}
          type="checkbox"
          checked={value}
          defaultChecked={defaultValue}
        />
        <label class="custom-control-label" for="customSwitchPrimary">
          {label}
        </label>
      </div>
      {/*
      <input
        ref={ref}
        type="text"
        class="form-control"
        name={name}
        placeholder={placeholder}
        {...props}
      /> */}
    </InputContainer>
  );
});
export default Switch;
