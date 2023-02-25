const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const { validators } = require("@/validators");

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

module.exports = {
  updatePublicUserData,
};
