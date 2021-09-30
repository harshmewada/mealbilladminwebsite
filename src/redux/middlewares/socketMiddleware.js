const socketMiddleware = (socket) => (store) => (next) => (action) => {
  const { branchId, restaurantId, id, kitchenDisplay } = store.getState().user;
  if (action.isSocket) {
    if (kitchenDisplay && Boolean(branchId)) {
      if (socket.connected === false) {
        socket.on("connect", async () => {
          socket.emit("JOIN_ROOM", branchId);
          socket.emit("GET_ORDERS", {
            branchId,
            restaurantId,
          });
          // socket.disconnect();
          socket.emit(action.type, {
            branchId,
            restaurantId,
            userId: id,
            ...action.payload,
          });
        });

        console.log("socket emit", action.type);
      } else {
        console.log("socket emit", action.type);
        socket.emit(action.type, {
          branchId,
          restaurantId,
          userId: id,
          ...action.payload,
        });
      }
    }
  } else {
    next(action);
  }
};
export default socketMiddleware;
