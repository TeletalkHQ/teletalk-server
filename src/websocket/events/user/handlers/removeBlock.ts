import { services } from "@/services";

import { BlackListItem, SocketOnHandler } from "@/types";

const removeBlock: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;

  await services.removeBlock({
    currentUserId,
    targetBlacklistItem: data as BlackListItem,
  });

  return {
    removedBlock: data,
  };
};

export { removeBlock };
