const { getAllUsers } = require("@/models/userModels/userModelFunctions");
const {
  testRoutes: { getAllUsersRoute },
} = require("@/variables/routes/testRoutes");

const getAllUsersTestController = async (
  _ = expressRequest,
  res = expressResponse
) => {
  try {
    const { users } = await getAllUsers();

    res.sendJsonResponse(getAllUsersRoute, { users });
  } catch (error) {
    logger.log("getAllUsersTestController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getAllUsersTestController };
