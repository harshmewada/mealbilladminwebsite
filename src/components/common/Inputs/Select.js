import React from "react";
import InputContainer from "./InputContainer";

const MyTextField = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    options,
    optionLabelProp,
    optionValueProp,
    placeholder,
    multiline,
    rows,
    error,
    defaultOption,
    size,
    noPadding,
    disabled,
  } = props;
  return (
    <InputContainer
      {...props}
      noPadding={noPadding}
      size={size}
      label={label}
      error={error}
    >
      <select
        name={name}
        class="form-control"
        ref={ref}
        {...props}
        size={undefined}
      >
        {defaultOption && defaultOption()}
        {options?.map((opt, index) => {
          return (
            <option
              value={optionValueProp ? opt[optionValueProp] : opt}
              key={index}
            >
              {opt[optionLabelProp]}
            </option>
          );
        })}
      </select>
    </InputContainer>
  );
});
export default MyTextField;
