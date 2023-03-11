import { Socket } from "socket.io";

const customUse =
  //prettier-ignore
  (socket:Socket) =>
    (middleware:(...args:unknown[])=>Promise<void>, ...args:unknown[]) => {
      socket.use(async (event, next) => {
        try {
          await middleware(socket, next, event, ...args);
        } catch (error) {
          logger.debug("error in mld:", error);
          socket.emit("error", error);
        }
      });
    };

export { customUse };
