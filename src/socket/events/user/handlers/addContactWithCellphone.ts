import { AddContactWithCellphoneIO, ContactItem } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const addContactWithCellphone: SocketOnHandler<
  AddContactWithCellphoneIO
> = async (socket, data) => {
  const {
    newContact: { isCellphoneAccessible, ...rest },
  } = await services.user.addContactWithCellphone({
    currentSessionId: socket.sessionId,
    addingContact: data,
    targetUserCellphone: extractor.unknownCellphone(data),
  });

  return {
    data: {
      newContact: {
        ...rest,
        ...extractor.unknownCellphone(data),
      } as ContactItem,
    },
  };
};
