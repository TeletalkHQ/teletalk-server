import { errorThrower } from "utility-store";

import { models } from "~/models";

import { UserMongo } from "~/types";

import { errors } from "~/variables";

const createNewUser = async (userData: UserMongo) => {
  await checkExistenceOfCurrentUser(userData.userId);
  await models.database.mongoDb.User.create(userData);
};

const checkExistenceOfCurrentUser = async (userId: UserMongo["userId"]) => {
  const currentUser = await models.database.mongoDb.User.findOne({ userId });
  errorThrower(!!currentUser, errors.currentUserExist);
};

export { createNewUser };
