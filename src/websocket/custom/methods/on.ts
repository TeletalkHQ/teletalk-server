import { Socket } from "socket.io";

import { ClientCallback, CustomOn, StringMap } from "@/types";

const customOn = (socket: Socket) => {
  return ((event, callback) => {
    socket.on(event, async (data: StringMap, cb: ClientCallback) => {
      try {
        const returnValue = await callback(socket, data);

        if (returnValue) {
          if (cb) cb(returnValue);
          else socket.customEmit(event, returnValue);
        }
      } catch (error) {
        logger.log(logger.levels.debug, "socket.customOn.error:", error);
        socket.emit("error", error);
      }
    });
  }) as CustomOn;
};

export { customOn };
