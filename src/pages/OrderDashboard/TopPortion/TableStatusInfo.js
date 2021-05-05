import React from "react";
const styles = {};
const TableStatusInfo = () => {
  return (
    <div class="instruction">
      <div class="inst-card">
        <div class="box available"></div>
        <span>Avail.</span>
      </div>
      <div class="inst-card">
        <div class="box busy"></div>
        <span>Busy</span>
      </div>
      <div class="inst-card">
        <div class="box reserved"></div>
        <span>Res.</span>
      </div>
    </div>
  );
};

export default TableStatusInfo;
