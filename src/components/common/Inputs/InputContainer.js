import React from "react";

const InputContainer = ({ label, size, children, noPadding, error }) => {
  return (
    <div
      class={`form-group col-md-${size || "6"}`}
      {...(noPadding && {
        style: {
          marginBottom: 0,
        },
      })}
    >
      {label && <label>{label}</label>}
      {children}

      {error && (
        <div className="text-danger mt-1">
          <small>{error}</small>
        </div>
      )}
    </div>
  );
};

export default InputContainer;
