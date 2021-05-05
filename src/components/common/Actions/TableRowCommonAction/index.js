import React from "react";

const TableRowCommonAction = ({ onClick, title, icon }) => {
  return (
    <button type="button" onClick={() => onClick()} class="btn btn-circle">
      <i class={`${icon} text-postive h4`}></i> {title}
    </button>
  );
};

export default TableRowCommonAction;
