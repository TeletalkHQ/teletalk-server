import { ExtendedFullName } from "utility-store/lib/types";

import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { SocketOnHandler } from "@/types";

import { validators } from "@/validators";

const addContact: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;
  const newContactFullName = userUtilities.extractFullName(
    data as ExtendedFullName
  );

  await validators.firstName(newContactFullName.firstName);
  await validators.lastName(newContactFullName.lastName);

  const newContact = {
    ...newContactFullName,
    userId: data.userId,
  };

  const { addedContact } = await services.addContact({
    currentUserId,
    newContact,
  });

  return { data: { addedContact } };
};

export { addContact };
