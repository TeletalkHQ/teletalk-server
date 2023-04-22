import { userUtilities } from "utility-store";

import { services } from "@/services";

import { SocketOnHandler } from "@/types";

import { errors } from "@/variables/errors";

const getPublicUserData: SocketOnHandler = async (_socket, data) => {
  const { userId } = data;

  const user = await services.getTargetUserData({
    userId,
  });
  if (!user) throw errors.TARGET_USER_NOT_EXIST;

  return {
    data: {
      publicUserData: userUtilities.extractPublicUserData(user),
    },
  };
};

export { getPublicUserData };
