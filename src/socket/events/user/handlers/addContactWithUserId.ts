import { AddContactWithUserIdIO } from "teletalk-type-store";
import { maker } from "utility-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const addContactWithUserId: SocketOnHandler<
  AddContactWithUserIdIO
> = async (socket, data) => {
  const {
    newContact: { isCellphoneAccessible, ...rest },
  } = await services.user.addContactWithUserId({
    currentSessionId: socket.sessionId,
    fullName: data,
    targetUserId: data.userId,
  });

  return {
    data: {
      newContact: {
        ...rest,
        ...maker.emptyCellphone(),
      },
    },
  };
};
