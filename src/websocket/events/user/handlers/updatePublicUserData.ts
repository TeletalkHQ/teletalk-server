import { PublicUserData } from "utility-store/lib/types";

import { userUtils } from "~/classes/UserUtils";
import { services } from "~/services";
import { SocketOnHandler, UpdatePublicUserDataIO } from "~/types";

const updatePublicUserData: SocketOnHandler<UpdatePublicUserDataIO> = async (
  socket,
  data
) => {
  const { userId: currentUserId } = socket;
  const { bio, firstName, lastName, username } = data;

  const updatedUser = await services.updatePublicUserData({
    currentUserId,
    updateProperties: {
      bio,
      firstName,
      lastName,
      username,
    },
  });

  const publicUserData = userUtils.extractPublicUserData(
    updatedUser as PublicUserData
  );

  return {
    data: {
      publicUserData,
    },
  };
};

export { updatePublicUserData };
