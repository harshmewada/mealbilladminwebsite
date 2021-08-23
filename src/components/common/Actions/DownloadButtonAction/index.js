import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const DownloadButtonAction = ({
  onClick,
  title,
  tooltipTitle,
  disabled,
  disabledTitle,
}) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="tooltip-disabled">{tooltipTitle || title}</Tooltip>}
    >
      <button
        type="button "
        onClick={() => {
          if (disabled) {
            return alert(disabledTitle);
          }

          onClick();
        }}
        class={`btn btn-outline-primary waves-effect waves-light mr-2`}
        // disabled={disabled}
      >
        <i class="mdi mdi-cloud-download-outline mr-2"></i> {title}{" "}
      </button>
    </OverlayTrigger>
  );
};

export default DownloadButtonAction;
