import React from "react";

const AddCommonAction = ({ onClick, title }) => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      class="btn btn-gradient-dark waves-effect waves-light"
    >
      <i class="mdi mdi-plus mr-2"></i> Add {title}
    </button>
  );
};

export default AddCommonAction;
