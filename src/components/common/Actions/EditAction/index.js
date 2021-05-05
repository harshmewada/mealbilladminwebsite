import React from "react";

const EditCommonAction = ({ onClick }) => {
  return (
    <button type="button" class="btn btn-circle" onClick={() => onClick()}>
      <i class="fas fa-edit text-primary h5"></i>
    </button>
  );
};

export default EditCommonAction;
