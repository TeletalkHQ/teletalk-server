import { extractor } from "utility-store";

import { errorStore } from "~/classes/ErrorStore";
import { services } from "~/services";
import { GetPublicUserDataIO, SocketOnHandler } from "~/types";

export const getPublicUserData: SocketOnHandler<GetPublicUserDataIO> = async (
  _socket,
  data
) => {
  const { userId } = data;

  const user = await services.findOneUser({
    userId,
  });
  if (!user) throw errorStore.find("TARGET_USER_NOT_EXIST");

  return {
    data: {
      publicUserData: extractor.publicUserData(user),
    },
  };
};
