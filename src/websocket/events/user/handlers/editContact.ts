import { userUtilities } from "~/classes/UserUtilities";
import { services } from "~/services";
import { Contact, SocketOnHandler } from "~/types";

const editContact: SocketOnHandler = async (socket, data) => {
  const { userId: currentUserId } = socket;
  const editValues = userUtilities.extractContact(data as Contact);

  await services.updateContact({ currentUserId, editValues });

  return {
    data: {
      editedContact: { ...editValues, userId: data.userId },
    },
  };
};

export { editContact };
