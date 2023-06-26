import { userUtils } from "utility-store";

import { services } from "~/services";
import { GetPublicUserDataIO, SocketOnHandler } from "~/types";
import { errors } from "~/variables";

const getPublicUserData: SocketOnHandler<GetPublicUserDataIO> = async (
  _socket,
  data
) => {
  const { userId } = data;

  const user = await services.getTargetUserData({
    userId,
  });
  if (!user) throw errors.targetUserNotExist;

  return {
    data: {
      publicUserData: userUtils.extractPublicUserData(user),
    },
  };
};

export { getPublicUserData };
