const { models } = require("@/models");

const User = models.database.mongoDb.User;

const findOneUser = async (userData, projection, options) => {
  return await User.findOne(userData, projection, options);
};

module.exports = { findOneUser };
