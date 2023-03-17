import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { Cellphone, SocketOnHandler } from "@/types";

const removeContact: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;
  const targetContact = userUtilities.extractCellphone(data as Cellphone);

  await services.removeContact({
    currentUserId,
    targetContact: targetContact,
  });

  return {
    removedContact: targetContact,
  };
};

export { removeContact };
