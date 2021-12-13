import React from "react";
const NormalInputContainer = ({
  label,
  size,
  children,
  noPadding,
  error,
  control,

  ...props
}) => {
  return (
    <div
      class={`form-group col-md-${size || "6"}`}
      {...(noPadding && {
        style: {
          marginBottom: 0,
        },
      })}
    >
      {" "}
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

export default NormalInputContainer;
