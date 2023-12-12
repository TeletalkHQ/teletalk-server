import { EventName, PingIO } from "teletalk-type-store";

import { SocketOnHandler } from "~/types";
import { utils } from "~/utils";

export const ping: SocketOnHandler<PingIO> = (socket) => {
  const data = {
    pong: `ping request from socketId:${socket.id}`,
  };

  socket.emit<EventName>("pong", utils.createSuccessResponse("pong", data));

  return {
    data,
    options: {
      shouldEmitToUserRooms: false,
    },
  };
};
