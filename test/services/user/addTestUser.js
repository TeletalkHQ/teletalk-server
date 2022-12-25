const { models } = require("@/models");

const addTestUser = async ({
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

module.exports = { addTestUser };
