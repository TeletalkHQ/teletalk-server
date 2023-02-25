import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

const editContact = async (socket, _io, data) => {
  const { currentUserId } = socket;
  const { userId, ...editValues } = userUtilities.extractContact(data);

  await services.updateContact().run({ currentUserId, editValues });

  return {
    editedContact: editValues,
  };
};

export { editContact };
