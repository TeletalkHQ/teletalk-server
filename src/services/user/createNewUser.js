const { errorThrower } = require("utility-store/src/utilities/utilities");

const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { User } = require("@/models/database/mongoDb/user");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const createNewUser = serviceBuilder
  .create()
  .body(async (userData) => {
    await checkExistenceOfCurrentUser(userData.userId);

    await User.create(userData);
    //CLEANME: Remove all ok:true
    return { ok: true };
  })
  .build();

const checkExistenceOfCurrentUser = async (userId) => {
  const currentUser = await commonServices.findOneUserById(userId);

  errorThrower(currentUser, errors.CURRENT_USER_EXIST);
};

module.exports = { createNewUser };
