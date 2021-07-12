import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const AddCommonAction = ({ onClick, title, disabled, disabledTitle }) => {
  return (
    <button
      type="button"
      onClick={() => {
        if (disabled) {
          return alert(disabledTitle);
        }

        onClick();
      }}
      class={`btn btn-gradient-primary waves-effect waves-light`}
      // disabled={disabled}
    >
      <i class="mdi mdi-plus mr-2"></i> Add {title}{" "}
    </button>
  );
};

export default AddCommonAction;
