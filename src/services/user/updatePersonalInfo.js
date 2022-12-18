const { trier } = require("utility-store/src/classes/Trier");

const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

const updatePersonalInfo = serviceBuilder
  .create()
  .body(async (data) => {
    return (
      await trier(updatePersonalInfo.name).tryAsync(
        tryToUpdatePersonalInfo,
        data
      )
    )
      .printAndThrow()
      .result();
  })
  .build();

const tryToUpdatePersonalInfo = async ({
  currentUserId,
  ...updateProperties
}) => {
  const currentUser = await findCurrentUser(currentUserId);

  return await currentUser.updateOne(updateProperties);
};

const findCurrentUser = async (currentUserId) => {
  return await serviceHelper.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

module.exports = { updatePersonalInfo };
