const { getAllUsers } = require("@/models/userModels/userModelFunctions");
const {
  testRoutes: {
    properties: {
      getAllUsersRoute: { properties: getAllUsersRoute },
    },
  },
} = require("@/variables/routes/testRoutes");

const getAllUsersTestController = async (
  req = expressRequest,
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
