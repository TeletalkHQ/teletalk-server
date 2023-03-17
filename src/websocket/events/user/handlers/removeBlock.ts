import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { Cellphone, SocketOnHandler } from "@/types";

const removeBlock: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;
  const targetCellphone = userUtilities.extractCellphone(data as Cellphone);

  await services.removeBlock({
    currentUserId,
    targetBlacklistItem: targetCellphone,
  });

  return {
    removedBlock: targetCellphone,
  };
};

export { removeBlock };
