const { trier } = require("utility-store/src/classes/Trier");

const { models } = require("@/models");

const User = models.database.mongoDb.User;

const findUser = async (userData, options, projection) => {
  const tryToFindUser = async () => {
    return await User.findOne(userData, projection, options);
  };

  return (await trier(findUser.name).tryAsync(tryToFindUser))
    .printAndThrow()
    .result();
};

module.exports = { findUser };
