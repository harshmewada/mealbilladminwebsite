import React from "react";
import InputContainer from "./InputContainer";
import Select from "react-select";
import { Controller, useController, useForm } from "react-hook-form";
const optionsd = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const MultiSelect = React.forwardRef((props, ref) => {
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
  } = props;

  const CustomOption = ({ innerRef, innerProps, ...props }) => {
    console.log("select options", options);
    return <div ref={innerRef} {...innerProps} />;
  };

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
        render={(props) => {
          console.log("dateTime", props);
          return (
            <Select
              options={options}
              isMulti={true}
              isDisabled={disabled}
              components={{ Option: CustomOption }}
              onChange={(data) => {
                console.log("select data", data);
              }}
            />
          );
        }}
        defaultValue={defaultValue}
      />
      {/* <select
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
      </select> */}
    </InputContainer>
  );
});
export default MultiSelect;
