const customOn = (socket) => (event, callback) => {
  socket.on(event, (...args) => {
    try {
      callback(...args);
    } catch (error) {
      console.log("socket.customOn.error:", error);
      socket.emit("error", error);
    }
  });
};

module.exports = { customOn };
