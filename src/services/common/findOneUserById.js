const { trier } = require("utility-store/src/classes/Trier");

const { models } = require("@/models");

const User = models.database.mongoDb.User;

const findOneUserById = async (userId, options, projection) => {
  const tryToFindUser = async () => {
    return await User.findOne({ userId }, projection, options);
  };

  return await trier(findOneUserById.name)
    .tryAsync(tryToFindUser)
    .throw()
    .runAsync();
};

module.exports = { findOneUserById };
