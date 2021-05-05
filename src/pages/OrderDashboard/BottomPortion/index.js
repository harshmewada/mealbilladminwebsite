import React from "react";
import OrderTotalDisplay from "./OrderTotalDisplay";

const BottomPortion = () => {
  return (
    <div class="card mb-0" style={{ width: "100%" }}>
      <div class="card-body pb-2 pt-2 mb-0">
        <OrderTotalDisplay />
      </div>
    </div>
  );
};

export default BottomPortion;
