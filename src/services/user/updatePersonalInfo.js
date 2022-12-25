const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

const updatePersonalInfo = serviceBuilder
  .create()
  .body(async ({ currentUserId, ...updateProperties }) => {
    const currentUser = await findCurrentUser(currentUserId);

    return await currentUser.updateOne(updateProperties);
  })
  .build();

const findCurrentUser = async (currentUserId) => {
  return await serviceHelper.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

module.exports = { updatePersonalInfo };
