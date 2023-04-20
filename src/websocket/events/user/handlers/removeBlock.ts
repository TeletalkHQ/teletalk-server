import { services } from "@/services";

import { BlackListItem, SocketOnHandler } from "@/types";
import { validators } from "@/validators";

const removeBlock: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;

  await validators.userId(data.userId);

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
