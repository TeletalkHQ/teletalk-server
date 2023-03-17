import { services } from "@/services";

import { SocketOnHandler } from "@/types";

const addBlock: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;

  await services.addBlock({
    blockingUserId: data.userId,
    currentUserId,
  });

  return { blockedCellphone: data };
};

export { addBlock };
