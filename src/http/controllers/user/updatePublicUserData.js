const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const { validators } = require("@/validators");

const tryToUpdatePublicUserData = async (req) => {
  const {
    body: { bio, firstName, lastName, username },
    currentUserId,
  } = req;

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

const updatePublicUserData = controllerBuilder
  .create()
  .body(tryToUpdatePublicUserData)
  .build();

module.exports = {
  updatePublicUserData,
};
