import { extractor } from "utility-store";

import { services } from "~/services";
import { GetPublicUserDataIO, SocketOnHandler } from "~/types";
import { errors } from "~/variables";

export const getPublicUserData: SocketOnHandler<GetPublicUserDataIO> = async (
  _socket,
  data
) => {
  const { userId } = data;

  const user = await services.findOneUser({
    userId,
  });
  if (!user) throw errors.targetUserNotExist;

  return {
    data: {
      publicUserData: extractor.publicUserData(user),
    },
  };
};
