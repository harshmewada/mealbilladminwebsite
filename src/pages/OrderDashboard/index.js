import React from "react";
import { useSelector } from "react-redux";
import LoadingFullPage from "../../components/common/Loading/LoadingFullPage";
import getOrderNeccesaryData from "../../helpers/getOrderNeccesaryData";
import useFullscreenStatus from "../../hooks/useFullscreenStatus";
import BottomPortion from "./BottomPortion";
import CenterPortion from "./CenterPortion/index";

import TopPortion from "./TopPortion";

const styles = {
  topStyle: {
    height: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
};
const OrderDashboard = () => {
  const ready = getOrderNeccesaryData();
  const isFullScreen = useSelector((state) => state.util.isFullScreen);
  const ref = React.useRef(null);

  const [isFullscreen, setIsFullscreen] = useFullscreenStatus(
    ref,
    isFullScreen
  );
  return ready ? (
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
      {/* <LeftPortion /> */}

      <CenterPortion />
      {/* <RightPortion /> */}

      <BottomPortion />
    </div>
  ) : (
    <LoadingFullPage />
  );
};

export default OrderDashboard;

// import React from "react";
// import LoadingFullPage from "../../components/common/Loading/LoadingFullPage";
// import getOrderNeccesaryData from "../../helpers/getOrderNeccesaryData";
// import BottomPortion from "./BottomPortion";
// import CenterPortion from "./CenterPortion/index";
// import LeftPortion from "./LeftPortion/index";
// import RightPortion from "./RightPortion/index";
// import TopPortion from "./TopPortion";

// const styles = {
//   topStyle: {
//     height: "100%",
//     flex: 1,
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//   },
// };
// const OrderDashboard = () => {
//   const ready = getOrderNeccesaryData();

//   return ready ? (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100%",
//         overflow: "hidden",
//       }}
//     >
//       <div style={{ width: "100%" }}>
//         <TopPortion />
//       </div>
//       <div style={styles.topStyle}>
//         {/* <LeftPortion /> */}
//         <CenterPortion />
//         {/* <RightPortion /> */}
//       </div>
//       <div class="row" style={{ width: "100%" }}>
//         <BottomPortion />
//       </div>
//     </div>
//   ) : (
//     <LoadingFullPage />
//   );
// };

// export default OrderDashboard;
