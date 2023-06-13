import { userUtilities } from "utility-store";

import { services } from "~/services";

import { SocketOnHandler } from "~/types";

import { errors } from "~/variables";

const getPublicUserData: SocketOnHandler = async (_socket, data) => {
  const { userId } = data;

  const user = await services.getTargetUserData({
    userId,
  });
  if (!user) throw errors.targetUserNotExist;

  return {
    data: {
      publicUserData: userUtilities.extractPublicUserData(user),
    },
  };
};

export { getPublicUserData };
