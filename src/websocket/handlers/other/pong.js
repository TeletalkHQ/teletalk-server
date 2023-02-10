const pong = (socket, data) => {
  socket.emit("pong", "YAY!");
};

module.exports = { pong };
