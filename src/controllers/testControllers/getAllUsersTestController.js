const { getAllUsers } = require("@/models/userModels/userModelFunctions");

const getAllUsersTestController = async (
  _ = expressRequest,
  res = expressResponse
) => {
  try {
    const { users } = await getAllUsers();

    res.checkAndResponse({ users });
  } catch (error) {
    logger.log("getAllUsersTestController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getAllUsersTestController };
