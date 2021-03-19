import React from "react";
import LoadingFullPage from "../../components/common/Loading/LoadingFullPage";
import getOrderNeccesaryData from "../../helpers/getOrderNeccesaryData";
import CenterPortion from "./CenterPortion/index";
import LeftPortion from "./LeftPortion/index";
import RightPortion from "./RightPortion/index";
const OrderDashboard = () => {
  const ready = getOrderNeccesaryData();

  return ready ? (
    <div class="row">
      <LeftPortion />
      <CenterPortion />
      <RightPortion />
    </div>
  ) : (
    <LoadingFullPage />
  );
};

export default OrderDashboard;
