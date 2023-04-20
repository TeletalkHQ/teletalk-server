import { services } from "@/services";

import { SocketOnHandler } from "@/types";
import { validators } from "@/validators";

const addBlock: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;

  await validators.userId(data.userId);

  await services.addBlock({
    blockingUserId: data.userId,
    currentUserId,
  });

  return {
    data: {
      blockedUser: {
        userId: data.userId,
      },
    },
  };
};

export { addBlock };
