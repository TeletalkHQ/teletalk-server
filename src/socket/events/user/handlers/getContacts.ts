import { GetContactsIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const getContacts: SocketOnHandler<GetContactsIO> = async (socket) => {
  const { contacts } = await services.user.getContacts({
    currentSessionId: socket.sessionId,
  });

  return {
    data: { contacts },
  };
};
