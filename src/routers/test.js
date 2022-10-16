const { Router } = require("express");

const { controllers } = require("@/controllers");

const { routes } = require("@/routes");

const testRouter = Router();

testRouter[routes.test.getAllUsers.method](
  routes.test.getAllUsers.url,
  controllers.getAllUsers
);

module.exports = { testRouter };
