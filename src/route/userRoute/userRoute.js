const { Router } = require("express");

const TrezSmsClient = require("trez-sms-client");

const userNormalRegisterController = require("~/controller/userController/userNormalRegisterController");
const userAnonymousRegisterController = require("~/controller/userController/userAnonymousRegisterController");

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

userRoute.post(
	"/register/normal/",
	userNormalRegisterController.normalRegister
);
userRoute.post(
	"/register/anonymous/",
	userAnonymousRegisterController.anonymousRegister
);

userRoute.post("/login/", userLoginController.login);

userRoute.post("/verify/", userVerifyController.verify);

//* logout normal =>

//* logout anonymous =>
//
//
exports.userRoute = userRoute;
