const { Router } = require("express");

const { controllers } = require("@/controllers/controllers");

const {
  testRoutes: { getAllUsersRoute },
} = require("@/variables/routes/testRoutes");

const testRouter = Router();

testRouter[getAllUsersRoute.method](
  getAllUsersRoute.url,
  controllers.getAllUsers
);

module.exports = { testRouter };
