import { errorThrower } from "utility-store";
import { UserData } from "utility-store/lib/types";

import { models } from "~/models";
import { errors } from "~/variables";

const createNewUser = async (userData: UserData) => {
  await checkExistenceOfCurrentUser(userData.userId);
  await models.database.mongoDb.User.create(userData);
};

const checkExistenceOfCurrentUser = async (userId: UserData["userId"]) => {
  const currentUser = await models.database.mongoDb.User.findOne({ userId });
  errorThrower(!!currentUser, errors.currentUserExist);
};

export { createNewUser };
