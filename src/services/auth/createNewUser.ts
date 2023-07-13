import { errorThrower } from "utility-store";
import { UserData } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { models } from "~/models";

export const createNewUser = async (userData: UserData) => {
  await checkExistenceOfCurrentUser(userData.userId);
  await models.database.User.create(userData);
};

const checkExistenceOfCurrentUser = async (userId: UserData["userId"]) => {
  const currentUser = await models.database.User.findOne({
    userId,
  });
  errorThrower(currentUser, errorStore.find("CURRENT_USER_EXIST"));
};
