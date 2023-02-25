import { errorThrower } from "utility-store/src/utilities/utilities";

import { serviceBuilder } from "@/classes/service/ServiceBuilder";

import { models } from "@/models";

import { commonServices } from "@/services/common";

import { errors } from "@/variables/errors";

const createNewUser = serviceBuilder
  .create()
  .body(async (userData) => {
    await checkExistenceOfCurrentUser(userData.userId);
    await models.database.mongoDb.User.create(userData);
  })
  .build();

const checkExistenceOfCurrentUser = async (userId) => {
  const currentUser = await commonServices.findOneUserById(userId);
  errorThrower(currentUser, errors.CURRENT_USER_EXIST);
};

export { createNewUser };
