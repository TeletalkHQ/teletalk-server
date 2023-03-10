import { models } from "@/models";
import { UserMongo } from "@/types";
import { ProjectionType, QueryOptions } from "mongoose";

const User = models.database.mongoDb.User;

const findOneUser = async (
  userData: Partial<UserMongo>,
  projection: ProjectionType<UserMongo>,
  options: QueryOptions
) => {
  return await User.findOne(userData, projection, options);
};

export { findOneUser };
