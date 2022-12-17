const { trier } = require("utility-store/src/classes/Trier");

const { models } = require("@/models");

const User = models.database.mongoDb.User;

const findUserById = async (userId, options, projection) => {
  const tryToFindUser = async () => {
    return await User.findOne({ userId }, projection, options);
  };

  return (await trier(findUserById.name).tryAsync(tryToFindUser))
    .printAndThrow()
    .result();
};

module.exports = { findUserById };
