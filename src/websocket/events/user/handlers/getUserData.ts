import { services } from "@/services";

import { HydratedUserMongo, SocketOnHandler } from "@/types";

const getUserData: SocketOnHandler = async (socket) => {
  const { currentUserId } = socket;

  const { sessions, ...userData } = (await services.getUserData(
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
