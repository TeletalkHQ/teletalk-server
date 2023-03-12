import { CustomUse } from "@/types";
import { Socket } from "socket.io";

const customUse = (socket: Socket) => {
  return ((middleware) => {
    socket.use(async (event, next) => {
      try {
        await middleware(socket, next, event);
      } catch (error) {
        logger.debug("error in mld:", error);
        socket.emit("error", error);
      }
    });
  }) as CustomUse;
};

export { customUse };
