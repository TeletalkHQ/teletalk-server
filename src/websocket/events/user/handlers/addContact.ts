import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { Contact, SocketOnHandler } from "@/types";

const addContact: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;
  const newContact = userUtilities.extractContact(data as Contact);

  const { addedContact } = await services.addContact({
    currentUserId,
    newContact,
  });

  return { addedContact };
};

export { addContact };
