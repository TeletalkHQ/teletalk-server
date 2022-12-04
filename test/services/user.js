const { models } = require("@/models");
const { trier } = require("utility-store/src/classes/Trier");

const addTestUser = async (userData) => {
  const tryToAddTestUser = async ({
    countryCode,
    countryName,
    firstName,
    lastName,
    token,
    phoneNumber,
    userId,
  }) => {
    const user = await models.database.mongoDb.User.findOneAndUpdate(
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

    return user;
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
