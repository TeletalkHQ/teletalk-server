const { Router } = require("express");

const { controllers } = require("@/controllers/controllers");

const { routes } = require("@/routes/routes");

const testRouter = Router();

testRouter[routes.test.getAllUsers.method](
  routes.test.getAllUsers.url,
  controllers.getAllUsers
);

module.exports = { testRouter };
