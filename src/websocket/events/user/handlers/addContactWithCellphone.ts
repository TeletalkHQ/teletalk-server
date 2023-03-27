import {
  ContactWithCellphone,
  ExtendedCellphone,
  ExtendedFullName,
} from "utility-store/lib/types";

import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { SocketOnHandler } from "@/types";

import { validators } from "@/validators";

const addContactWithCellphone: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;
  const fullName = userUtilities.extractFullName(data as ExtendedFullName);

  await validators.firstName(fullName.firstName);
  await validators.lastName(fullName.lastName);

  const cellphone = userUtilities.extractCellphone(data as ExtendedCellphone);

  await validators.cellphone(cellphone);

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
