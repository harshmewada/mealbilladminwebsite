import React from "react";

const ViewCommonAction = ({ onClick }) => {
  return (
    <button type="button" class="btn btn-circle" onClick={() => onClick()}>
      <i class="mdi mdi-eye-outline text-primary h5"></i>
    </button>
  );
};

export default ViewCommonAction;
