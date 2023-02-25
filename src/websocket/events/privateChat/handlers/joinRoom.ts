const joinRoom = (socket) => socket.join(socket.currentUserId);

export { joinRoom };
