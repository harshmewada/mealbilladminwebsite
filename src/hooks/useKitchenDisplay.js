import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { SOCKETURL } from "../contants";

const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";

const SEND_TO_CUSTOMER_VIEW = "SEND_TO_CUSTOMER_VIEW";

const SEND_TO_ADMIN_VIEW = "SEND_TO_ADMIN_VIEW";

const SOCKET_SERVER_URL = SOCKETURL;

const useKitchenDisplay = (roomId) => {
  const [messages, setMessages] = useState();
  const [customerMessages, setCustomerMessages] = useState();

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on("connect", () => {
      console.log("socket socketRef.current.id", socketRef.current.id);

      socketRef.current.emit("JOIN_ROOM", roomId);
    });

    socketRef.current.on(SEND_TO_ADMIN_VIEW, (message) => {
      setMessages(message);
    });

    socketRef.current.on(SEND_TO_CUSTOMER_VIEW, (message) => {
      console.log("SEND_TO_CUSTOMER_VIEW", message);
      setCustomerMessages(message);
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

  return socketRef.current;
};

export default useKitchenDisplay;
