const customOn = (socket) => (event, callback) => {
  socket.on(event, async (...args) => {
    try {
      const returnValue = await callback(...args);

      const cb = args[1];
      if (returnValue) {
        const response = { data: returnValue };
        if (cb) cb(response);
        else socket.emit(event, response);
      }
    } catch (error) {
      console.log("socket.customOn.error:", error);
      socket.emit("error", error);
    }
  });
};

module.exports = { customOn };
