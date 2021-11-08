const { Router } = require("express");

const {
	indexUserController: {
		anonymousRegisterAuthController,
		loginAuthController,
		normalRegisterAuthController,
		routeAuthTemplate,
		templateAuthController,
		errorAuthController,
		verifyAuthController,
	},
} = require("~/controller/authController/indexAuthController");

const authRoute = Router();

const {
	login,
	verify,
	registerAnonymous,
	// logoutNormal,
	// logoutAnonymous,
	registerNormal,
	error,
	template,
} = routeAuthTemplate;

authRoute.post(registerNormal.route, normalRegisterAuthController);
authRoute.post(registerAnonymous.route, anonymousRegisterAuthController);

authRoute.post(login.route, loginAuthController);

authRoute.post(verify.route, verifyAuthController);

authRoute.get(error.route, errorAuthController);

authRoute.get(template.route, templateAuthController);

//* logout normal =>

//* logout anonymous =>
//
//
module.exports = { authRoute };
