const ping = (socket) => {
  return `ping request from socketId:${socket.id}`;
};

module.exports = { ping };
