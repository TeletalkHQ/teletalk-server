const joinRoom = (socket) => socket.join(socket.currentUserId);

module.exports = { joinRoom };
