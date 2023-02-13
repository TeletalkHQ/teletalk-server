const customUse =
  //prettier-ignore
  (socket) =>
    (middleware, ...args) => {
      socket.use((event, next) => {
        try {
          middleware(socket, next, event, ...args);
        } catch (error) {
          console.log("error in mld:", error);
          socket.emit("error", error);
        }
      });
    };

module.exports = { customUse };
