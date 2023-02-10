const logout = (socket) => {
  socket.handshake.headers.cookie = undefined;
};

module.exports = {
  logout,
};
