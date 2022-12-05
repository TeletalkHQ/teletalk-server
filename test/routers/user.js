const { Router } = require("express");

const { controllers } = require("@/controllers");

const { routes } = require("$/routes");

const userRouter = Router();

userRouter[routes.getAllUsers.method](
  routes.test.getAllUsers.url,
  controllers.getAllUsers
);

module.exports = { userRouter };
