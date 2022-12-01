const { trier } = require("utility-store/src/classes/Trier");

const { models } = require("@/models");

const {
  initialOptions: { userInitialOptions },
} = require("@/variables/others/initialOptions");

const User = models.database.mongoDb.User;

const tryToFindUser = async (userData, options, projection) => {
  return await User.findOne(userData, projection, options);
};
const userFinder = async (
  userData = userInitialOptions,
  options,
  projection
) => {
  return (
    await trier(userFinder.name).tryAsync(
      tryToFindUser,
      userData,
      options,
      projection
    )
  )
    .printAndThrow()
    .result();
};

const commonServices = { userFinder };

module.exports = { commonServices };
