const { Router } = require("express");

const userRegisterController = require("~/controller/user/userRegisterController");

const userRouter = Router();

userRouter.post("/register/", userRegisterController.register);

exports.userRouter = userRouter;
