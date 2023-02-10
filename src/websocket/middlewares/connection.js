const connection = (socket, next) => {
  console.log("a user connected, id:", socket.id);
  next();
};

module.exports = { connection };
