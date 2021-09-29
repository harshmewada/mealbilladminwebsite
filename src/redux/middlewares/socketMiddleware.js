const socketMiddleware = (socket) => (store) => (next) => (action) => {
  const { branchId, restaurantId, id, kitchenDisplay } = store.getState().user;
  // if (action.isSocket) {
  if (kitchenDisplay && Boolean(branchId)) {
    if (socket.connected === false) {
      socket.on("connect", () => {
        socket.emit("JOIN_ROOM", branchId);
        // socket.disconnect();
        socket.emit(action.type, {
          branchId,
          restaurantId,
          id,
          ...action.payload,
        });
      });
    } else {
      socket.emit(action.type, {
        branchId,
        restaurantId,
        id,
        ...action.payload,
      });
    }
  }
  // }

  next(action);
};
export default socketMiddleware;
