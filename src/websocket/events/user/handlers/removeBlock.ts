import { services } from "~/services";

import { BlackListItem, SocketOnHandler } from "~/types";

const removeBlock: SocketOnHandler = async (socket, data) => {
  const { userId: currentUserId } = socket;

  await services.removeBlock({
    currentUserId,
    targetBlacklistItem: data as BlackListItem,
  });

  return {
    data: {
      removedBlock: data,
    },
  };
};

export { removeBlock };
