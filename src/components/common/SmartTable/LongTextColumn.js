import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const LongTextColumn = ({ data }) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="tooltip-disabled">{data}</Tooltip>}
    >
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "200px",
          whiteSpace: "nowrap",
          cursor: "pointer",
        }}
      >
        {data}
      </div>
    </OverlayTrigger>
  );
};

export default LongTextColumn;
