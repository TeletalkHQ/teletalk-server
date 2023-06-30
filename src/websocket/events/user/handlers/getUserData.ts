import { services } from "~/services";
import { GetUserDataIO, SocketOnHandler } from "~/types";

export const getUserData: SocketOnHandler<GetUserDataIO> = async (socket) => {
  const { userId: currentUserId } = socket;

  const { clients, ...userData } = (await services.findOneUserById(
    {
      userId: currentUserId,
    },
    undefined,
    {
      lean: true,
    }
  ))!;

  return {
    data: {
      user: userData,
    },
  };
};
