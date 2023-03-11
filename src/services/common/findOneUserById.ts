import { ProjectionType, QueryOptions } from "mongoose";

import { models } from "@/models";

import { UserMongo } from "@/types";

//TODO: Update with serviceBuilder
const findOneUserById = async (
  userId: string,
  options?: QueryOptions,
  projection?: ProjectionType<UserMongo>
) => {
  return await models.database.mongoDb.User.findOne(
    { userId },
    projection,
    options
  );
};

export { findOneUserById };
