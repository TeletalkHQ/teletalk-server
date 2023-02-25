import { models } from "@/models";

const User = models.database.mongoDb.User;

//TODO: Update with serviceBuilder
const findOneUserById = async (userId, options, projection) => {
  return await User.findOne({ userId }, projection, options);
};

export { findOneUserById };
