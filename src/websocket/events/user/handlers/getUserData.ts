import { services } from "~/services";
import { GetUserDataIO, SocketOnHandler } from "~/types";

const getUserData: SocketOnHandler<GetUserDataIO> = async (socket) => {
  const { userId: currentUserId } = socket;

  const { clients, ...userData } = (await services.getUserData(
    {
      userId: currentUserId,
    },
    { lean: true }
  ))!;

  return {
    data: {
      //FIXME: Handle it in serviceHandler
      user: JSON.parse(JSON.stringify(userData)),
    },
  };
};

export { getUserData };
