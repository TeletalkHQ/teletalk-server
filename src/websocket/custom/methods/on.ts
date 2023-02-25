const customOn = (socket) => (event, callback) => {
  socket.on(event, async (...args) => {
    try {
      const returnValue = await callback(...args);

      const cb = args[1];
      if (returnValue) {
        if (cb) cb(returnValue);
        else socket.customEmit(event, returnValue);
      }
    } catch (error) {
      logger.log("socket.customOn.error:", error);
      socket.emit("error", error);
    }
  });
};

export { customOn };
