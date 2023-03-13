import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { Contact, SocketOnHandler } from "@/types";

const editContact: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;
  const editValues = userUtilities.extractContact(data as Contact);

  await services.updateContact({ currentUserId, editValues });

  return {
    editedContact: { ...editValues, userId: data.userId },
  };
};

export { editContact };
