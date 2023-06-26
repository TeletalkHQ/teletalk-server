import { ProjectionType, QueryOptions } from "mongoose";
import { UserData } from "utility-store/lib/types";

import { models } from "~/models";

const findOneUserById = async (
  userId: string,
  options?: QueryOptions,
  projection?: ProjectionType<UserData>
) => {
  return await models.database.mongoDb.User.findOne(
    { userId },
    projection,
    options
  );
};

export { findOneUserById };
