import { ProjectionType, QueryOptions } from "mongoose";
import { UserData } from "utility-store/lib/types";

import { commonServices } from "~/services/common";

const getUserData = async (
  data: { userId: string },
  options?: QueryOptions,
  projection?: ProjectionType<UserData>
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
  projection?: ProjectionType<UserData>

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
  projection?: ProjectionType<UserData>
) => {
  return await commonServices.findOneUserById(data.userId, options, projection);
};

export { getUserData, getTargetUserData };
