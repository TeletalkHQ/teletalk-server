import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

const removeBlock = async (socket, _io, data) => {
  const { currentUserId } = socket;
  const targetUserData = userUtilities.extractCellphone(data);

  await services.removeBlock().run({ currentUserId, targetUserData });

  return {
    removedBlock: targetUserData,
  };
};

export { removeBlock };
