import { Socket } from "socket.io";

const customOn =
  //prettier-ignore
  (socket: Socket) =>
    (event: string, callback: (...args:unknown[]) => Promise<void | object>) => {
      socket.on(event, async (...args: unknown[]) => {
        try {
          const returnValue = await callback(...args);

          const cb = args[1];
          if (returnValue) {
            if (cb) cb(returnValue);
            else socket.customEmit(event, returnValue);
          }
        } catch (error) {
          logger.log(logger.levels.debug, "socket.customOn.error:", error);
          socket.emit("error", error);
        }
      });
    };

export { customOn };
