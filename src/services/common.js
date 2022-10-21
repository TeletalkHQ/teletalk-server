const { trier } = require("utility-store/src/classes/Trier");

const { models } = require("@/models");

const {
  initialOptions: { userInitialOptions },
} = require("@/variables/others/initialOptions");

const User = models.database.mongoDb.User;

const tryToFindUser = async (userData, options) => {
  return await User.findOne(userData, undefined, options);
};
const userFinder = async (userData = userInitialOptions, options) => {
  return (
    await trier(userFinder.name).tryAsync(tryToFindUser, userData, options)
  )
    .printAndThrow()
    .result();
};

const commonServices = { userFinder };

module.exports = { commonServices };
