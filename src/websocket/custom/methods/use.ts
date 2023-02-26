const customUse =
  //prettier-ignore
  (socket) =>
    (middleware, ...args) => {
      socket.use(async (event, next) => {
        try {
          await middleware(socket, next, event, ...args);
        } catch (error) {
          logger.log("error in mld:", error);
          socket.emit("error", error);
        }
      });
    };

export { customUse };
