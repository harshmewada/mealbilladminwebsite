import React from "react";
import InputContainer from "./InputContainer";

const EmptySpace = (props) => {
  const { label, name, placeholder, multiline, rows, error, size } = props;

  return (
    <InputContainer
      {...props}
      label={label}
      error={error}
      size={size}
    ></InputContainer>
  );
};

export default EmptySpace;
