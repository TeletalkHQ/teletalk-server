const { Router } = require("express");

const TrezSmsClient = require("trez-sms-client");

const userRegisterController = require("~/controller/userController/userRegisterController");
const userLoginController = require("~/controller/userController/userLoginController");
const userVerifyController = require("~/controller/userController/userVerifyController");

const SMSClient = new TrezSmsClient(
	process.env.SMS_CLIENT_USERNAME,
	process.env.SMS_CLIENT_PASSWORD
);

const userRoute = Router();

userRoute.use((req, res, next) => {
	req.SMSClient = SMSClient;
	next();
});

userRoute.post("/register/", userRegisterController.register);
userRoute.post("/login", userLoginController.login);
userRoute.post("/verify", userVerifyController.verify);

exports.userRoute = userRoute;
