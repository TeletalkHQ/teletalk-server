import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

const removeContact = async (socket, _io, data) => {
  const { currentUserId } = socket;
  const targetUserData = userUtilities.extractCellphone(data);

  await services.removeContact().run({
    currentUserId,
    targetUserData,
  });

  return {
    removedContact: targetUserData,
  };
};

export { removeContact };
