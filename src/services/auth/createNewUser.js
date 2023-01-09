const { errorThrower } = require("utility-store/src/utilities/utilities");

const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { models } = require("@/models");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

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

module.exports = { createNewUser };
