// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import socketIOClient from "socket.io-client";
// import { usePermissions } from "../components/PermissionGate";
// import { SCOPES, SOCKETURL } from "../contants";
// import { mainSocket } from "../redux/store";
// import { socketTypes } from "../redux/types";

// const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";

// const SEND_TO_CUSTOMER_VIEW = "SEND_TO_CUSTOMER_VIEW";

// const SEND_TO_ADMIN_VIEW = "SEND_TO_ADMIN_VIEW";

// const SOCKET_SERVER_URL = SOCKETURL;

// const useKitchenDisplay = (roomId) => {
//   const [messages, setMessages] = useState();
//   const [customerMessages, setCustomerMessages] = useState([]);
//   const hasPermission = usePermissions({
//     scopes: [SCOPES.KITCHEN_DISPLAY_SYSTEM],
//   });

//   const dispatch = useDispatch();
//   const { branchId, restaurantId, id, role } = useSelector(
//     (state) => state.user
//   );
//   let socketRef = mainSocket;
//   const isKitchenUser = role === "kitchenuser";

//   useEffect(() => {
//     socketRef = socketIOClient(SOCKET_SERVER_URL, {
//       query: { branchId },
//       reconnectionAttempts: 10,
//     });

//     // if (hasPermission) {
//     socketRef.on("connect", async () => {
//       socketRef.emit(socketTypes.GET_ORDER_DASHBOARD_DATA, {
//         data: "hello",
//       });
//       socketRef.on(socketTypes.GET_ORDER_DASHBOARD_DATA, (data) => {
//         console.log("socket data", data);
//       });
//     });
//     // }

//     socketRef.on("SOCKET_ERROR", (message) => {
//       alert(`Error ${message}`);
//     });
// socketRef.emit(socketTypes.GET_ORDER_DASHBOARD_DATA, {
//   data: "hello",
// });
// socketRef.on(socketTypes.GET_ORDER_DASHBOARD_DATA, (data) => {
//   console.log("socket data", data);
// });
//     return () => {
//       socketRef.disconnect();
//     };
//   }, [roomId]);

//   return { customerMessages };
// };

// export default useKitchenDisplay;

import React from "react";
import { usePermissions } from "../components/PermissionGate";
import { SCOPES } from "../contants";
import { mainSocket } from "../redux/store";
import { socketTypes } from "../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDashboardData } from "../redux/action/newOrderActions";
import actionCreator from "../helpers/actionCreatetor";
const useOrderData = () => {
  const dispatch = useDispatch();
  const hasPermission = usePermissions({
    scopes: [SCOPES.KITCHEN_DISPLAY_SYSTEM],
  });

  const { branchId, restaurantId } = useSelector((state) => state.user);
  const socket = mainSocket;

  React.useEffect(() => {
    if (socket) {
      socket.emit("JOIN_ROOM", branchId);

      socket.on("JOIN_ROOM", (data) => {
        console.log("socket join room", data);
        dispatch(getOrderDashboardData({ branchId, restaurantId }));
      });
      //   socket.emit(socketTypes.GET_ORDER_DASHBOARD_DATA, {
      //     branchId,
      //     restaurantId,
      //   });
      socket.on(socketTypes.GET_ORDER_DASHBOARD_DATA, (data) => {
        console.log("socket ", data);

        dispatch({
          type: actionCreator(socketTypes.GET_ORDER_DASHBOARD_DATA).success,
          payload: data,
        });
      });
    }
  }, []);
};

export default useOrderData;
