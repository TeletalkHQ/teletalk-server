import { LogoutIO } from "teletalk-type-store";

import { authSessionStore } from "~/classes/AuthSessionStore";
import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const logout: SocketOnHandler<LogoutIO> = async (socket) => {
  await services.user.logout({
    currentSessionId: socket.sessionId,
  });

  await authSessionStore.remove(socket.sessionId);

  return {
    data: {},
    options: {
      cbAfterEmit: () => {
        socket.rooms.clear();
        socket.disconnect();
      },
      shouldEmitReturnValue: false,
      shouldEmitToUserRooms: false,
    },
  };
};
