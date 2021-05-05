import React from "react";

const PageTitleContainer = ({ title }) => {
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            {/* <div class="float-right">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="javascript:void(0);">Metrica</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="javascript:void(0);">Analytics</a>
                  </li>
                  <li class="breadcrumb-item active">Dashboard</li>
                </ol>
              </div> */}
            <h4 class="page-title">{title}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitleContainer;
