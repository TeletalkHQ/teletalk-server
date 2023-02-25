const { models } = require("@/models");

const User = models.database.mongoDb.User;

//TODO: Update with serviceBuilder
const findOneUserById = async (userId, options, projection) => {
  return await User.findOne({ userId }, projection, options);
};

module.exports = { findOneUserById };
