import React from "react";
import { useWatch } from "react-hook-form";

const InputContainer = ({
  label,
  size,
  children,
  noPadding,
  error,
  control,

  ...props
}) => {
  // // console.log("props", props);
  // const [show, setShow] = React.useState(true);
  // let watchField = useWatch({
  //   control,
  //   name: props.dependentOn, // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  // });

  // const shouldRender = typeof watchField === "string";

  // // console.log("watchField", watchField, props.dependentOn);
  // // let formValues = props.dependentOn
  // //   ? props.getValues(props.dependentOn)
  // //   : undefined;
  // React.useEffect(() => {
  //   if (props.dependentOn) {
  //     if (shouldRender) {
  //       console.log("watchField", watchField, props.dependentOn);
  //       if (watchField) {
  //         // setShow(true);
  //       }
  //     } else {
  //       setShow(false);
  //     }
  //     // setShow(false);
  //   } else {
  //     setShow(true);
  //   }
  // }, [shouldRender]);

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

export default InputContainer;
