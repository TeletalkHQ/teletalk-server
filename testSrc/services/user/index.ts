import { databaseModels } from "@/models/database";

const deleteAllUsers = async () => {
  await databaseModels.mongoDb.User.deleteMany();
};

const userServices = { deleteAllUsers };

export { userServices };
