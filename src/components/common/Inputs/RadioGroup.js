import React from "react";
import InputContainer from "./InputContainer";
import { Controller, useController, useForm } from "react-hook-form";
const optionsd = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const Select = React.forwardRef((props, ref) => {
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
    control,
    defaultValue,
    value,
    onSelect,
    onCustomChange,
  } = props;

  return (
    <InputContainer
      {...props}
      noPadding={noPadding}
      size={size}
      label={label}
      error={error}
    >
      <Controller
        control={control}
        name={name}
        rules={props.rules}
        disabled={disabled}
        render={(props) => {
          return (
            <div class="row mb-3">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="option1"
                />
                <label class="form-check-label" for="inlineRadio1">
                  HTML5
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="option2"
                />
                <label class="form-check-label" for="inlineRadio2">
                  Css
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="option3"
                />
                <label class="form-check-label" for="inlineRadio3">
                  Javascript
                </label>
              </div>
            </div>
          );
        }}
        defaultValue={defaultValue}
      />
    </InputContainer>
  );
});
export default Select;
