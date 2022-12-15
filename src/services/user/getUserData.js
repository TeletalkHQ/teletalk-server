const { errorThrower } = require("utility-store/src/functions/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { User } = require("@/models/database/mongoDb/user");

const { errors } = require("@/variables/errors");

const getUserData = async (currentUserId) => {
  const tryToGetUserData = async () => {
    //CLEANME: Update with userFinder
    const user = await User.findOne({ userId: currentUserId }, undefined, {});

    errorThrower(!user, errors.CURRENT_USER_NOT_EXIST);

    return user;
  };

  return (await trier(getUserData.name).tryAsync(tryToGetUserData))
    .printAndThrow()
    .result();
};

module.exports = { getUserData };
