const { trier } = require("utility-store/src/classes/Trier");

const { models } = require("@/models");

const User = models.database.mongoDb.User;

const findOneUser = async (userData, options, projection) => {
  const tryToFindUser = async () => {
    return await User.findOne(userData, projection, options);
  };

  return (await trier(findOneUser.name).tryAsync(tryToFindUser))
    .printAndThrow()
    .result();
};

module.exports = { findOneUser };
