import { models } from "@/models";

const getAllUsers = async () => {
  return await models.database.mongoDb.User.find();
};

export { getAllUsers };
