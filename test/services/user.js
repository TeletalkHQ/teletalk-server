const { trier } = require("utility-store/src/classes/Trier");

const { models } = require("@/models");

const addTestUser = async (userData) => {
  const tryToAddTestUser = async ({
    countryCode,
    countryName,
    firstName,
    lastName,
    phoneNumber,
    token,
    userId,
  }) => {
    return await models.database.mongoDb.User.findOneAndUpdate(
      { countryCode, countryName, phoneNumber },
      {
        sessions: [{ token }],
        userId,
        firstName,
        lastName,
        contacts: [],
        blacklist: [],
      },
      {
        upsert: true,
        lean: true,
        new: true,
      }
    );
  };

  return (await trier(addTestUser.name).tryAsync(tryToAddTestUser, userData))
    .printAndThrow()
    .result();
};

const testServices = {
  addTestUser,
};

module.exports = {
  testServices,
};
