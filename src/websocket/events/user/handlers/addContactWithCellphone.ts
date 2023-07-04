import { services } from "~/services";
import { AddContactWithCellphoneIO, SocketOnHandler } from "~/types";

export const addContactWithCellphone: SocketOnHandler<
  AddContactWithCellphoneIO
> = async (socket, data) => {
  const { userId: currentUserId } = socket;

  const { addedContact } = await services.addContactWithCellphone({
    currentUserId,
    addingContact: data,
  });

  return {
    data: {
      addedContact,
    },
  };
};
