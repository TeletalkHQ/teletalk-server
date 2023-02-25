import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

const addContact = async (socket, _io, data) => {
  const { currentUserId } = socket;
  const newContactData = userUtilities.extractContact(data);

  const { newContact } = await services
    .addContact()
    .run({ currentUserId, newContactData });

  return {
    addedContact: {
      ...newContact,
      userId: newContact.userId,
    },
  };
};

export { addContact };
