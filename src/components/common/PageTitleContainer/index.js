import React from "react";

const PageTitleContainer = ({ title }) => {
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            <h4 class="page-title">{title}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitleContainer;
