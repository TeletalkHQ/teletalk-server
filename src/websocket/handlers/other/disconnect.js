const disconnect = (socket) => {
  console.log("a user connected, id:", socket.id);
};

module.exports = { disconnect };
