const customUse =
  //prettier-ignore
  (socket= socketIntellisense) =>
    (middleware, ...args) => {
      socket.use(async (event, next) => {
        try {
          await middleware(socket, next, event, ...args);
        } catch (error) {
          console.log("error in mld:", error);
          socket.emit("error", error);
        }
      });
    };

module.exports = { customUse };
