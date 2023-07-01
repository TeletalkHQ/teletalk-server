import { errorThrower } from "utility-store";
import { UserData } from "utility-store/lib/types";

import { models } from "~/models";
import { errors } from "~/variables";

export const createNewUser = async (userData: UserData) => {
  await checkExistenceOfCurrentUser(userData.userId);
  await models.database.User.create(userData);
};

const checkExistenceOfCurrentUser = async (userId: UserData["userId"]) => {
  const currentUser = await models.database.User.findOne({
    userId,
  });
  errorThrower(currentUser, errors.currentUserExist);
};
