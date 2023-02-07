const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

const updateOnlineStatus = serviceBuilder
  .create()
  .body(async ({ currentUserId, online }) => {
    const currentUser = await findCurrentUser(currentUserId);

    await currentUser.updateOne({
      status: { ...currentUser.status, online },
    });

    return await findCurrentUser(currentUserId);
  })
  .build();

const findCurrentUser = async (currentUserId) => {
  return await serviceHelper.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

module.exports = { updateOnlineStatus };
