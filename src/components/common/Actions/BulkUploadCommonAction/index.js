import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const BulkUploadCommonAction = ({
  onClick,
  title,
  disabled,
  disabledTitle,
  isLoading,
}) => {
  const fileInputRef = React.useRef();

  const handleChange = (e) => {
    // console.log("handleChange", e.target.files);
    if (e.target.files && e.target.files?.length > 0) {
      onClick(e.target.files[0]);
    }
    // do something with event data
  };
  return (
    <OverlayTrigger
      placement="right"
      overlay={
        <Tooltip id="tooltip-disabled">
          Choose Excel file to bulk upload
        </Tooltip>
      }
    >
      <>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            if (disabled) {
              return alert(disabledTitle);
            }

            fileInputRef.current.click();
          }}
          class={`btn btn-gradient-primary waves-effect waves-light mr-2`}
          // disabled={disabled}
        >
          {isLoading ? (
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <>
              {" "}
              <i class="mdi mdi-cloud-upload mr-2"></i>{" "}
              {isLoading ? "Uploading" : "Bulk Upload"} {title}
            </>
          )}
        </button>
        <input
          onChange={handleChange}
          multiple={false}
          ref={fileInputRef}
          type="file"
          hidden
          accept=".xlsx, .xls"
        />
      </>
    </OverlayTrigger>
  );
};

export default BulkUploadCommonAction;
