import { services } from "@/services";

import { HydratedUserMongo, SocketOnHandler } from "@/types";

const getCurrentUserData: SocketOnHandler = async (socket) => {
  const { currentUserId } = socket;

  const { sessions, ...userData } = (await services.getCurrentUserData({
    userId: currentUserId,
  })) as HydratedUserMongo;

  return {
    user: userData,
  };
};

export { getCurrentUserData };
