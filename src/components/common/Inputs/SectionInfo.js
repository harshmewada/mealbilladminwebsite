import React from "react";
import InputContainer from "./InputContainer";

const SectionInfo = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    title,
    description,
    placeholder,
    multiline,
    rows,
    error,
    size,
  } = props;
  return (
    <InputContainer {...props} label={""} error={error} size={12}>
      <div className="row border-bottom">
        <div className="col-md-12">
          <h4>{title}</h4>
        </div>
        {description && (
          <div className="col-md-12">
            <p>{description}</p>
          </div>
        )}
      </div>

      {/* <hr /> */}
    </InputContainer>
  );
});
export default SectionInfo;
