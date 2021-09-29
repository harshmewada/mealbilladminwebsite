import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { SOCKETURL } from "../contants";

const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";

const SEND_TO_CUSTOMER_VIEW = "SEND_TO_CUSTOMER_VIEW";

const SEND_TO_ADMIN_VIEW = "SEND_TO_ADMIN_VIEW";

const SOCKET_SERVER_URL = SOCKETURL;

let socket;
export const intializeSocket = (roomId) => {
  socket = socketIOClient(SOCKET_SERVER_URL, {
    query: { roomId },
  });

  socket.on("connect", () => {
    console.log("socketsocket.id", socket.id);

    socket.emit("JOIN_ROOM", roomId);
  });
};

const intializeSocketFunctions = (dispatch) => {
  socket.on(SEND_TO_ADMIN_VIEW, (data) => {
    // setMessages(message);
    console.log("SEND_TO_ADMIN_VIEW", data);
  });

  socket.on(SEND_TO_CUSTOMER_VIEW, (data) => {
    console.log("SEND_TO_CUSTOMER_VIEW", data);
  });
};
const useKitchenDisplay = (roomId) => {
  const [messages, setMessages] = useState();
  const [customerMessages, setCustomerMessages] = useState();

  const socketRef = useRef();

  useEffect(() => {
    socket = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socket.on("connect", () => {
      console.log("socket socket.id", socket.id);

      socket.emit("JOIN_ROOM", roomId);
    });

    socket.on(SEND_TO_ADMIN_VIEW, (message) => {
      setMessages(message);
    });

    socket.on(SEND_TO_CUSTOMER_VIEW, (message) => {
      console.log("SEND_TO_CUSTOMER_VIEW", message);
      setCustomerMessages(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendToAdmin = (messageBody) => {
    console.log("messageBody", messageBody);
    if (!socketRef.current) return;
    socket.emit(SEND_TO_ADMIN_VIEW, messageBody);
  };

  const sendToCustomer = (messageBody) => {
    if (!socketRef.current) return;
    socket.emit(SEND_TO_CUSTOMER_VIEW, messageBody);
  };

  const clearMessages = (messageBody) => {
    setMessages();
    setCustomerMessages();
  };

  return socket;
};

export default useKitchenDisplay;
