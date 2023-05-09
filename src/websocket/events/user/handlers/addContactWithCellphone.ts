import {
  ContactWithCellphone,
  ExtendedCellphone,
  ExtendedFullName,
} from "utility-store/lib/types";

import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { SocketOnHandler } from "@/types";

const addContactWithCellphone: SocketOnHandler = async (socket, data) => {
  const { userId: currentUserId } = socket;
  const fullName = userUtilities.extractFullName(data as ExtendedFullName);

  const cellphone = userUtilities.extractCellphone(data as ExtendedCellphone);

  const newContact: ContactWithCellphone = {
    ...fullName,
    ...cellphone,
    userId: data.userId,
  };

  await services.addContactWithCellphone({
    currentUserId,
    newContact,
  });

  return {
    data: {
      addedContact: newContact,
    },
  };
};

export { addContactWithCellphone };
