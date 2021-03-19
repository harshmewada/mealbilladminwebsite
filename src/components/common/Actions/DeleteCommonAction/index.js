import React from "react";

const DeleteCommonAction = ({ onClick }) => {
  return (
    <button type="button" onClick={() => onClick()} class="btn btn-circle">
      <i class="mdi mdi-trash-can-outline text-danger h4"></i>
    </button>
  );
};

export default DeleteCommonAction;
