const { Router } = require("express");

const userRegisterController = require("~/controller/userController/userRegisterController");

const userRouter = Router();

userRouter.post("/register/", userRegisterController.register);

exports.userRouter = userRouter;
