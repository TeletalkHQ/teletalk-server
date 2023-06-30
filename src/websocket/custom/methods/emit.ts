import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { CustomEmit, EventName, SocketResponse, StringMap } from "~/types";

export const registerCustomEmit = (socket: Socket) => {
  return ((eventName, data) => {
    trier(`socket.customEmit:${eventName}`)
      .sync()
      .try(tryBlock, socket, data, eventName)
      .throw()
      .run();
  }) as CustomEmit;
};

const tryBlock = (socket: Socket, data: StringMap, eventName: EventName) => {
  const response: SocketResponse = { data, ok: true, errors: [] };

  socket.emit(eventName, response);
};
