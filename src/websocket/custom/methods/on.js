const customOn = (socket) => (event, callback) => {
  socket.on(event, async (...args) => {
    try {
      const returnValue = await callback(...args);

      const cb = args[1];
      if (returnValue) {
        if (cb) cb(returnValue);
        else socket.emit(event, returnValue);
      }
    } catch (error) {
      console.log("socket.customOn.error:", error);
      socket.emit("error", error);
    }
  });
};

module.exports = { customOn };
