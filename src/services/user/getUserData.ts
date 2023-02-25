import { serviceBuilder } from "@/classes/service/ServiceBuilder";
import { serviceHelper } from "@/classes/service/ServiceHelper";

import { errors } from "@/variables/errors";

const getCurrentUserData = async ({ userId }) => {
  return await getUserDataById().exclude().run({
    userId,
    error: errors.CURRENT_USER_NOT_EXIST,
  });
};

const getTargetUserData = async ({ userId }) => {
  return await getUserDataById().exclude().run({
    userId,
    error: errors.TARGET_USER_NOT_EXIST,
  });
};

const getUserDataById = serviceBuilder
  .create()
  .body(async (data) => {
    return await serviceHelper.findOneUserById(data.userId, data.error);
  })
  .build();

export { getCurrentUserData, getTargetUserData };
