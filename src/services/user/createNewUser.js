const { trier } = require("utility-store/src/classes/Trier");

const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { User } = require("@/models/database/mongoDb/user");

const { commonServices } = require("@/services/common");

const { errorThrower } = require("@/utilities/utilities");

const { errors } = require("@/variables/errors");

const createNewUser = serviceBuilder
  .create()
  .body(async (userData) => {
    return (
      await trier(createNewUser.name).tryAsync(tryToCreateNewUser, userData)
    )
      .printAndThrow()
      .result();
  })
  .build();

const tryToCreateNewUser = async (userData) => {
  //TODO: Add tests when user exist
  await checkExistenceOfCurrentUser(userData.userId);

  await User.create(userData);
  return { ok: true };
};

const checkExistenceOfCurrentUser = async (userId) => {
  const currentUser = await commonServices.findOneUserById(userId);
  errorThrower(currentUser, errors.CURRENT_USER_EXIST);
};

module.exports = { createNewUser };
