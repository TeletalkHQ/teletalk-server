const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

const addNewSession = serviceBuilder
  .create()
  .body(async ({ userId, newToken }) => {
    const currentUser = await findCurrentUser(userId);
    await addAndSaveNewToken(currentUser, newToken);
  })
  .build();

const findCurrentUser = async (userId) => {
  return await serviceHelper.findOneUserById(
    userId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

const addAndSaveNewToken = async (currentUser, newToken) => {
  currentUser.sessions.push({ token: newToken });
  await currentUser.save();
};

module.exports = { addNewSession };
