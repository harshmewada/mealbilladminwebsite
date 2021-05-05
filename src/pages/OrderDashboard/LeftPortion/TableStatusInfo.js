import React from "react";

const TableStatusInfo = () => {
  return (
    <div class="instruction">
      <div class="inst-card">
        <div class="box available"></div>
        <span>Available</span>
      </div>
      <div class="inst-card">
        <div class="box busy"></div>
        <span>Busy</span>
      </div>
      <div class="inst-card">
        <div class="box reserved"></div>
        <span>Reserved</span>
      </div>
    </div>
  );
};

export default TableStatusInfo;
