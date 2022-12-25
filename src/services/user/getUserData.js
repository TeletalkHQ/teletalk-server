const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

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

module.exports = {
  getCurrentUserData,
  getTargetUserData,
};
