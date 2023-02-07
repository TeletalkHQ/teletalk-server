const { Router } = require("express");

const { controllers } = require("@/http/controllers");

const { routes } = require("$/http/routes");

const userRouter = Router();

userRouter[routes.getAllUsers.method](
  routes.test.getAllUsers.url,
  controllers.getAllUsers
);

module.exports = { userRouter };
