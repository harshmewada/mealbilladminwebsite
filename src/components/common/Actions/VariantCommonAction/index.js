import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const VariantCommonAction = ({ onClick, title, disabled, disabledTitle }) => {
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip id="tooltip-disabled">{title}</Tooltip>}
    >
      <button
        type="button"
        onClick={() => {
          if (disabled) {
            return alert(disabledTitle);
          }

          onClick();
        }}
        class="btn btn-circle"
      >
        <i class="mdi mdi-food-variant text-danger h4"></i>
      </button>
    </OverlayTrigger>
  );
};

export default VariantCommonAction;
