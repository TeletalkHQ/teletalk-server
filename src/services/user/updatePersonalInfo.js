const { trier } = require("utility-store/src/classes/Trier");

const { commonServices } = require("@/services/common");

const updatePersonalInfo = async ({ currentUserId, ...updateProperties }) => {
  const tryToUpdatePersonalInfo = async () => {
    const currentUser = await commonServices.findUserById(currentUserId);

    return await currentUser.updateOne(updateProperties);
  };

  return (
    await trier(updatePersonalInfo.name).tryAsync(tryToUpdatePersonalInfo)
  )
    .printAndThrow()
    .result();
};

module.exports = { updatePersonalInfo };
