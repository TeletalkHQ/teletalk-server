import { GetUserDataIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const getUserData: SocketOnHandler<GetUserDataIO> = async (socket) => {
  const {
    user: { sessions, ...rest },
  } = await services.user.findBySessionId({
    currentSessionId: socket.sessionId,
  });

  const { contacts } = await services.user.getContacts({
    currentSessionId: socket.sessionId,
  });

  return {
    data: {
      user: {
        ...rest,
        contacts,
      },
    },
  };
};
