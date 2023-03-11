import { commonServices } from "@/services/common";
import { NativeModelError } from "@/types";

import { errors } from "@/variables/errors";

const getCurrentUserData = async (data: { userId: string }) => {
  return await getUserDataById({
    userId: data.userId,
    error: errors.CURRENT_USER_NOT_EXIST,
  });
};

const getTargetUserData = async (data: { userId: string }) => {
  return await getUserDataById({
    userId: data.userId,
    error: errors.TARGET_USER_NOT_EXIST,
  });
};

const getUserDataById = async (data: {
  userId: string;
  error: NativeModelError;
}) => {
  return await commonServices.findOneUserById(data.userId, data.error);
};

export { getCurrentUserData, getTargetUserData };
