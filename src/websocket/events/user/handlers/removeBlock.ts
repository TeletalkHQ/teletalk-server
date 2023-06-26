import { services } from "~/services";
import { RemoveBlockIO, SocketOnHandler } from "~/types";

const removeBlock: SocketOnHandler<RemoveBlockIO> = async (socket, data) => {
  const { userId: currentUserId } = socket;

  await services.removeBlock({
    currentUserId,
    targetUserId: data.userId,
  });

  return {
    data: {
      removedBlock: data,
    },
  };
};

export { removeBlock };
