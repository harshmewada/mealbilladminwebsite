import React from "react";
import { useSelector } from "react-redux";
import LoadingFullPage from "../../components/common/Loading/LoadingFullPage";
import getOrderNeccesaryData from "../../helpers/getOrderNeccesaryData";
import useFullscreenStatus from "../../hooks/useFullscreenStatus";
// import useKitchenDisplay from "../../hooks/useKitchenDisplay";
import useOrderData from "../../hooks/useOrderData";
// import BottomPortion from "./BottomPortion";
import CenterPortion from "./CenterPortion/index";

import TopPortion from "./TopPortion/index";

const OrderDashboard = () => {
  // const ready = getOrderNeccesaryData();

  const orderData = useOrderData();
  // const kitchen = useKitchenDisplay();

  const isFullScreen = useSelector((state) => state.util.isFullScreen);

  const ref = React.useRef(null);

  const [isFullscreen, setIsFullscreen] = useFullscreenStatus(
    ref,
    isFullScreen
  );

  // const data = useKitchenDisplay();
  return true ? (
    <div
      ref={ref}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TopPortion />
      <CenterPortion />
      {/* <CenterPortion />

      <BottomPortion /> */}
    </div>
  ) : (
    <LoadingFullPage />
  );
};

export default OrderDashboard;
