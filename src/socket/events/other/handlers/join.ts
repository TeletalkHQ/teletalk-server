import { EventName, JoinIO } from "teletalk-type-store";

import { clientStatusStore } from "~/classes/ClientStatusStore";
import { services } from "~/services";
import { SocketOnHandler } from "~/types";
import { utils } from "~/utils";

export const join: SocketOnHandler<JoinIO> = async (socket) => {
  const {
    user: { userId },
  } = await services.user.findBySessionId({
    currentSessionId: socket.sessionId,
  });
  socket.join("public");
  socket.join(userId);
  clientStatusStore.incConnection(userId);

  const responseToGetClientStatus = utils.createSuccessResponse(
    "getClientStatus",
    {
      isOnline: true,
      userId,
    }
  );

  socket.broadcast.emit<EventName>(
    responseToGetClientStatus.eventName,
    responseToGetClientStatus
  );

  return {
    data: {},
  };
};
