const { routeGenerator } = require("~/functions/utilities/generators");

const testBaseUrl = routeGenerator(true, "/test", true, "1.0.0");

const getAllUsersRoute = routeGenerator("get", "getAllUsers", 200, "1.0.0");

const testRoutes = {
  properties: {
    testBaseUrl,
    getAllUsersRoute,
  },

  info: { version: "1.0.0" },
};

module.exports = { testRoutes };
