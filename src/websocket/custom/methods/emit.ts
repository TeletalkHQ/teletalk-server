/* eslint-disable indent */
import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { CustomEmit, StringMap } from "~/types";

const registerCustomEmit = (socket: Socket) => {
  return ((event, data) => {
    trier("socket.customEmit")
      .sync()
      .try(tryBlock, socket, data, event)
      .throw()
      .run();
  }) as CustomEmit;
};

const tryBlock = (socket: Socket, data: StringMap, event: string) => {
  socket.emit(event, { data, ok: true });
};

export { registerCustomEmit };
