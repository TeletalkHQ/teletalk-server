import { userUtilities } from "utility-store";

import { services } from "@/services";

import { SocketOnHandler } from "@/types";

import { validators } from "@/validators";

import { errors } from "@/variables/errors";

const getPublicUserData: SocketOnHandler = async (_socket, data) => {
  const { userId } = data;

  await validators.userId(userId);

  const user = await services.getTargetUserData({
    userId,
  });
  if (!user) throw errors.TARGET_USER_NOT_EXIST;

  return {
    publicUserData: userUtilities.extractPublicUserData(user),
  };
};

export { getPublicUserData };
