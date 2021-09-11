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
            <select
              name={name}
              class="form-control"
              ref={ref}
              disabled={disabled}
              // {...props}
              value={props.value}
              size={undefined}
              onChange={({ target: { value } }) => {
                onSelect && onSelect(value);

                props.onChange(value);
              }}
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
          );
        }}
        defaultValue={defaultValue}
      />
    </InputContainer>
  );
});
export default Select;

// import React from "react";
// import InputContainer from "./InputContainer";

// const MyTextField = React.forwardRef((props, ref) => {
//   const {
//     label,
//     name,
//     options,
//     optionLabelProp,
//     optionValueProp,
//     placeholder,
//     multiline,
//     rows,
//     error,
//     defaultOption,
//     size,
//     noPadding,
//     disabled,
//   } = props;
//   return (
//     <InputContainer
//       {...props}
//       noPadding={noPadding}
//       size={size}
//       label={label}
//       error={error}
//     >
//       <select
//         name={name}
//         class="form-control"
//         ref={ref}
//         {...props}
//         size={undefined}
//       >
//         {defaultOption && defaultOption()}
//         {options?.map((opt, index) => {
//           return (
//             <option
//               value={optionValueProp ? opt[optionValueProp] : opt}
//               key={index}
//             >
//               {opt[optionLabelProp]}
//             </option>
//           );
//         })}
//       </select>
//     </InputContainer>
//   );
// });
// export default MyTextField;
