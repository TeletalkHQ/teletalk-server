const { trier } = require("utility-store/src/classes/Trier");

const { models } = require("@/models");

const User = models.database.mongoDb.User;

const userFinder = async (userData, options, projection) => {
  const tryToFindUser = async () => {
    return await User.findOne(userData, projection, options);
  };

  return (await trier(userFinder.name).tryAsync(tryToFindUser))
    .printAndThrow()
    .result();
};

const commonServices = { userFinder };

module.exports = { commonServices };
