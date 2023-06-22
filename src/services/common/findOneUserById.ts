import { ProjectionType, QueryOptions } from "mongoose";

import { models } from "~/models";
import { HydratedUserMongo, UserMongo } from "~/types";

const findOneUserById = async (
  userId: string,
  options?: QueryOptions,
  projection?: ProjectionType<UserMongo>
) => {
  return (await models.database.mongoDb.User.findOne(
    { userId },
    projection,
    options
  )) as HydratedUserMongo | null;
};

export { findOneUserById };
