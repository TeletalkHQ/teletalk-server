const { User } = require("@/models/database/mongoDb/user");

const getAllUsers = async () => {
  return await User.find();
};

module.exports = { getAllUsers };
