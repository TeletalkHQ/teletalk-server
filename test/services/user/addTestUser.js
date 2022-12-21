const { trier } = require("utility-store/src/classes/Trier");

const { models } = require("@/models");

const addTestUser = async (userData) => {
  const tryToAddTestUser = async ({
    bio,
    countryCode,
    countryName,
    firstName,
    lastName,
    phoneNumber,
    token,
    userId,
    username,
  }) => {
    return await models.database.mongoDb.User.findOneAndUpdate(
      { countryCode, countryName, phoneNumber },
      {
        bio,
        blacklist: [],
        contacts: [],
        firstName,
        lastName,
        sessions: [
          {
            token,
          },
        ],
        userId,
        username,
      },
      {
        upsert: true,
        lean: true,
        new: true,
      }
    );
  };

  return await trier(addTestUser.name)
    .tryAsync(tryToAddTestUser, userData)
    .throw()
    .runAsync();
};

module.exports = { addTestUser };
