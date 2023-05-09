import { services } from "@/services";

import { HydratedUserMongo, SocketOnHandler } from "@/types";

const getUserData: SocketOnHandler = async (socket) => {
  const { userId: currentUserId } = socket;

  const { clients, ...userData } = (await services.getUserData(
    {
      userId: currentUserId,
    },
    { lean: true }
  )) as HydratedUserMongo;

  return {
    data: {
      user: userData,
    },
  };
};

export { getUserData };
