import { commonServices } from "@/services/common";
import { UserMongo } from "@/types";

import { ProjectionType, QueryOptions } from "mongoose";

const getUserData = async (
  data: { userId: string },
  options?: QueryOptions,
  projection?: ProjectionType<UserMongo>
) => {
  return await getUserDataById(
    {
      userId: data.userId,
    },
    options,
    projection
  );
};

const getTargetUserData = async (
  data: { userId: string },
  options?: QueryOptions,
  projection?: ProjectionType<UserMongo>

  // eslint-disable-next-line sonarjs/no-identical-functions
) => {
  return await getUserDataById(
    {
      userId: data.userId,
    },
    options,
    projection
  );
};

const getUserDataById = async (
  data: { userId: string },
  options?: QueryOptions,
  projection?: ProjectionType<UserMongo>
) => {
  return await commonServices.findOneUserById(data.userId, options, projection);
};

export { getUserData, getTargetUserData };
