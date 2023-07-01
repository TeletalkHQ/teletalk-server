import { services } from "~/services";
import { RemoveContactIO, SocketOnHandler } from "~/types";

export const removeContact: SocketOnHandler<RemoveContactIO> = async (
  socket,
  data
) => {
  const { userId: currentUserId } = socket;

  await services.removeContact({
    currentUserId,
    targetUserId: data.userId,
  });

  return {
    data: {
      removedContact: { userId: data.userId },
    },
  };
};
