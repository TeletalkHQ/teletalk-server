const ping = (socket) => {
  return `ping request from socketId:${socket.id}`;
};

export { ping };
