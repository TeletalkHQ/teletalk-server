import { services } from "~/services";
import { SocketOnHandler } from "~/types";

const addBlock: SocketOnHandler = async (socket, data) => {
  const { userId: currentUserId } = socket;

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
