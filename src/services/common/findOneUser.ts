import { models } from "@/models";

const User = models.database.mongoDb.User;

const findOneUser = async (userData, projection, options) => {
  return await User.findOne(userData, projection, options);
};

export { findOneUser };
