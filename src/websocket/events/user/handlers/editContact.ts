import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { Contact, SocketOnHandler } from "@/types";
import { validators } from "@/validators";

const editContact: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;
  const editValues = userUtilities.extractContact(data as Contact);

  await validators.userId(editValues.userId);
  await validators.firstName(editValues.firstName);
  await validators.lastName(editValues.lastName);

  await services.updateContact({ currentUserId, editValues });

  return {
    data: {
      editedContact: { ...editValues, userId: data.userId },
    },
  };
};

export { editContact };
