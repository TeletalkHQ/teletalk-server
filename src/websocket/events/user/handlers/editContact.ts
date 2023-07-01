import { services } from "~/services";
import { EditContactIO, SocketOnHandler } from "~/types";

export const editContact: SocketOnHandler<EditContactIO> = async (
  socket,
  data
) => {
  const { userId: currentUserId } = socket;

  await services.updateContact({ currentUserId, editValues: data });

  return {
    data: {
      editedContact: data,
    },
  };
};
