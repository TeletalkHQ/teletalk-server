const { trier } = require("utility-store/src/classes/Trier");

const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

const getUserData = serviceBuilder
  .create()
  .body(async (data) => {
    return await trier(getUserData.name)
      .tryAsync(tryToGetUserData, data)
      .throw()
      .runAsync();
  })
  .build();

const tryToGetUserData = async ({ userId }) => {
  return await serviceHelper.findOneUserById(
    userId,
    errors.TARGET_USER_NOT_EXIST
  );
};

module.exports = { getUserData };
