import React from "react";
import useFormWatch from "../../../hooks/useFormWatch";
const InputContainer = ({
  label,
  size,
  children,
  noPadding,
  error,
  control,

  ...props
}) => {
  console.log("props", control);
  const [show, setShow] = React.useState(true);
  const watchField = useFormWatch({
    control: control,
    fieldName: props.dependentOn,
  });

  const shouldRender = watchField !== null;

  React.useEffect(() => {
    if (props.dependentOn) {
      if (shouldRender) {
        if (watchField) {
          setShow(true);
        } else {
          setShow(false);
        }
      }
    }
  }, [shouldRender, watchField]);

  return (
    show && (
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
    )
  );
};

export default InputContainer;
