import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import { SOCKETURL } from "../contants";
import {
  activateOrder,
  activateOrderSocket,
  changeItemQuantity,
  changeItemQuantitySocket,
  deleteLocalOrderSocket,
  getSocketOrders,
  pushItemToActiveOrderSocket,
  removeItemSocket,
  setItemAsPreparedSocket,
  setKOTitemsDataRedux,
} from "../redux/action/orderActions";
import { orderTypes } from "../redux/types";

const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";

const SEND_TO_CUSTOMER_VIEW = "SEND_TO_CUSTOMER_VIEW";

const SEND_TO_ADMIN_VIEW = "SEND_TO_ADMIN_VIEW";

const SOCKET_SERVER_URL = SOCKETURL;

const useKitchenDisplay = (roomId) => {
  const [messages, setMessages] = useState();
  const [customerMessages, setCustomerMessages] = useState([]);
  const dispatch = useDispatch();
  const { branchId, restaurantId, id, role } = useSelector(
    (state) => state.user
  );
  const socketRef = useRef();
  const isKitchenUser = role === "kitchenuser";

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { branchId },
      reconnectionAttempts: 10,
    });

    socketRef.current.on("connect", async () => {
      // console.log("socket socketRef.current.id", socketRef.current.id);

      await socketRef.current.emit("JOIN_ROOM", branchId);
      await getAllOrders();
    });

    if (!isKitchenUser) {
      socketRef.current.on(orderTypes.ACTIVATE_ORDER, (message) => {
        console.log("message", message);
        dispatch(activateOrderSocket(message));
      });

      socketRef.current.on(orderTypes.PUSH_ITEM_TO_ORDER, (message) => {
        console.log("push received", message);
        dispatch(pushItemToActiveOrderSocket(message));
      });

      socketRef.current.on(orderTypes.CHANGE_ITEM_QUANTITY, (message) => {
        dispatch(changeItemQuantitySocket(message));
      });

      socketRef.current.on(orderTypes.REMOVE_ITEM, (message) => {
        dispatch(removeItemSocket(message));
      });

      socketRef.current.on(orderTypes.DELETE_LOCAL_ORDER, (message) => {
        dispatch(deleteLocalOrderSocket(message?.refId));
      });

      socketRef.current.on(orderTypes.SET_KOT_ITEMS, (message) => {
        dispatch(setKOTitemsDataRedux(message));
      });

      socketRef.current.on(SEND_TO_ADMIN_VIEW, (message) => {
        setMessages(message);
      });

      socketRef.current.on(SEND_TO_CUSTOMER_VIEW, (message) => {
        setCustomerMessages(message);
      });
    }

    socketRef.current.on(orderTypes.SET_ITEM_AS_PREPARED, (message) => {
      dispatch(setItemAsPreparedSocket(message));
    });
    socketRef.current.on("GET_ORDERS", (message) => {
      // console.log("getsocket", message);
      setCustomerMessages(message);
      dispatch(getSocketOrders(message));
    });

    socketRef.current.on("SOCKET_ERROR", (message) => {
      alert(`Error ${message}`);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendToAdmin = (messageBody) => {
    console.log("messageBody", messageBody);
    if (!socketRef.current) return;
    socketRef.current.emit(SEND_TO_ADMIN_VIEW, messageBody);
  };

  const sendToCustomer = (messageBody) => {
    if (!socketRef.current) return;
    socketRef.current.emit(SEND_TO_CUSTOMER_VIEW, messageBody);
  };

  const clearMessages = (messageBody) => {
    setMessages();
    setCustomerMessages();
  };

  const getAllOrders = () => {
    socketRef.current.emit("GET_ORDERS", {
      branchId,
      restaurantId,
    });
  };

  return { getAllOrders, customerMessages };
};

export default useKitchenDisplay;
