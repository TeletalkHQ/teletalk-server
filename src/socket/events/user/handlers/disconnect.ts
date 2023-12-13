import { DisconnectIO, EventName } from "teletalk-type-store";

import { clientStatusStore } from "~/classes/ClientStatusStore";
import { services } from "~/services";
import { SocketOnHandler } from "~/types";
import { utils } from "~/utils";

export const disconnect: SocketOnHandler<DisconnectIO> = async (socket) => {
  const notAllowedEvents: EventName[] = ["signIn", "createNewUser", "verify"];

  if (socket.sessionId && !notAllowedEvents.includes(socket.eventName)) {
    const {
      user: { userId },
    } = await services.user.findBySessionId({
      currentSessionId: socket.sessionId,
    });

    await clientStatusStore.decConnection(userId);

    const response = utils.createSuccessResponse("getClientStatus", {
      isOnline: await clientStatusStore.isOnline(userId),
      userId,
    });

    socket.broadcast.emit<EventName>(response.eventName, response);
  }

  return {
    data: {},
    options: {
      shouldEmitReturnValue: false,
      shouldEmitToUserRooms: false,
      shouldCallResponseCallback: false,
    },
  };
};
