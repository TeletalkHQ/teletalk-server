import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { PublicUserData, SocketOnHandler } from "@/types";

import { validators } from "@/validators";

const updatePublicUserData: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;
  const { bio, firstName, lastName, username } = data;

  await validators.firstName(firstName);
  await validators.lastName(lastName);
  await validators.bio(bio);
  await validators.username(username);

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    updatedUser as PublicUserData
  );

  return {
    publicUserData,
  };
};

export { updatePublicUserData };
