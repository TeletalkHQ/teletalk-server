import { GetAvatarIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const getAvatar: SocketOnHandler<GetAvatarIO> = async (
  _socket,
  data
) => {
  const { avatarSrc } = await services.user.getAvatar({
    targetUserId: data.userId,
  });

  return {
    data: {
      avatarSrc,
      userId: data.userId,
    },
  };
};
