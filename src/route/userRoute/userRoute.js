const { Router } = require("express");

const TrezSmsClient = require("trez-sms-client");

const userNormalRegisterController = require("~/controller/userController/userNormalRegisterController");
const userAnonymousRegisterController = require("~/controller/userController/userAnonymousRegisterController");
const userLoginController = require("~/controller/userController/userLoginController");
const userVerifyController = require("~/controller/userController/userVerifyController");

const {
	userRouteTemplate,
} = require("~/model/template/routeTemplate/userRouteTemplate");

const userRoute = Router();

const {
	login,
	verify,
	registerAnonymous,
	// logoutNormal,
	// logoutAnonymous,
	registerNormal,
} = userRouteTemplate;

const SMSClient = new TrezSmsClient(
	process.env.SMS_CLIENT_USERNAME,
	process.env.SMS_CLIENT_PASSWORD
);

userRoute.use((req, res, next) => {
	req.SMSClient = SMSClient;

	next();
});

userRoute.post(
	registerNormal.route,
	userNormalRegisterController.normalRegister
);
userRoute.post(
	registerAnonymous.route,
	userAnonymousRegisterController.anonymousRegister
);

userRoute.post(login.route, userLoginController.login);

userRoute.post(verify.route, userVerifyController.verify);

//* logout normal =>

//* logout anonymous =>
//
//
exports.userRoute = userRoute;
