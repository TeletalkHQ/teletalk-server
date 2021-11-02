const { Router } = require("express");

const TrezSmsClient = require("trez-sms-client");

const userNormalRegisterController = require("~/controller/authController/normalRegisterAuthController");
const userAnonymousRegisterController = require("~/controller/authController/anonymousRegisterAuthController");
const userLoginController = require("~/controller/authController/loginAuthController");
const userVerifyController = require("~/controller/authController/verifyAuthController");

const {
	userRouteTemplate,
} = require("~/model/template/routeTemplate/userRouteTemplate");

const userAuthRoute = Router();

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

userAuthRoute.use((req, res, next) => {
	req.SMSClient = SMSClient;

	next();
});

userAuthRoute.post(
	registerNormal.route,
	userNormalRegisterController.normalRegisterAuthController
);
userAuthRoute.post(
	registerAnonymous.route,
	userAnonymousRegisterController.anonymousRegisterAuthController
);

userAuthRoute.post(login.route, userLoginController.loginAuthController);

userAuthRoute.post(verify.route, userVerifyController.verifyAuthController);

//* logout normal =>

//* logout anonymous =>
//
//
exports.userAuthRoute = userAuthRoute;
