import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { validators } from "@/validators";

const updatePublicUserData = async (socket, _io, data) => {
  const { currentUserId } = socket;
  const { bio, firstName, lastName, username } = data;

  await validators.firstName(firstName);
  await validators.lastName(lastName);
  await validators.bio(bio);
  await validators.username(username);

  const updatedUser = await services.updatePublicUserData().run({
    currentUserId,
    bio,
    firstName,
    lastName,
    username,
  });

  const publicUserData = userUtilities.extractPublicUserData(updatedUser);

  return {
    publicUserData,
  };
};

export { updatePublicUserData };
