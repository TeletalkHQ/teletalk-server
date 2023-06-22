import { ExtendedFullName } from "utility-store/lib/types";

import { userUtilities } from "~/classes/UserUtilities";
import { services } from "~/services";
import { SocketOnHandler } from "~/types";

const addContact: SocketOnHandler = async (socket, data) => {
  const { userId: currentUserId } = socket;
  const newContactFullName = userUtilities.extractFullName(
    data as ExtendedFullName
  );

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
