import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { Contact, SocketOnHandler } from "@/types";

const removeContact: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;

  const targetContact = userUtilities.extractContact(data as Contact);

  await services.removeContact({
    currentUserId,
    targetContact,
  });

  return {
    data: {
      removedContact: targetContact,
    },
  };
};

export { removeContact };
