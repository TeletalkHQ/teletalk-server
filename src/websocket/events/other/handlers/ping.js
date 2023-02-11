const ping = (socket) => {
  socket.emit("pong", "YAY!");
};

module.exports = { ping };
