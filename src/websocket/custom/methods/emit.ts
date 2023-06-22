import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { CustomEmit, EventName, SocketResponse, StringMap } from "~/types";

const registerCustomEmit = (socket: Socket) => {
  return ((event, data) => {
    trier(`socket.customEmit:${event}`)
      .sync()
      .try(tryBlock, socket, data, event)
      .throw()
      .run();
  }) as CustomEmit;
};

const tryBlock = (socket: Socket, data: StringMap, event: EventName) => {
  const response: SocketResponse = { data, ok: true, errors: [] };

  console.log("response:::", response);
  console.log("response.data:::", response.data);

  socket.emit(event, response);
};

export { registerCustomEmit };
