import { services } from "@/services";

import { HydratedUserMongo, SocketOnHandler } from "@/types";

const getCurrentUserData: SocketOnHandler = async (socket) => {
  const { currentUserId } = socket;

  const { sessions, ...userData } = (await services.getCurrentUserData(
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

export { getCurrentUserData };
