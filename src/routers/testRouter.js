const { Router } = require("express");

const {
  getAllUsersTestController,
} = require("@/controllers/testControllers/getAllUsersTestController");

const {
  testRoutes: {
    properties: {
      getAllUsersRoute: { properties: getAllUsersRoute },
    },
  },
} = require("@/variables/routes/testRoutes");

const testRouter = Router();

testRouter[getAllUsersRoute.method](
  getAllUsersRoute.url,
  getAllUsersTestController
);

module.exports = { testRouter };
