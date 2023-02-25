const disconnect = (socket = socketIntellisense) => {
  socket.disconnect();
};

module.exports = { disconnect };
