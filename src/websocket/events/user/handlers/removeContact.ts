import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { Contact, SocketOnHandler } from "@/types";

import { validators } from "@/validators";

const removeContact: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;

  await validators.userId(data.userId);

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
