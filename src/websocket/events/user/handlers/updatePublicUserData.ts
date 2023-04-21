import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { PublicUserData, SocketOnHandler } from "@/types";

const updatePublicUserData: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;
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

  const publicUserData = userUtilities.extractPublicUserData(
    updatedUser as PublicUserData
  );

  return {
    data: {
      publicUserData,
    },
  };
};

export { updatePublicUserData };
