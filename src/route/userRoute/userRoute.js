const { Router } = require("express");

const {
	indexUserController: {
		anonymousRegisterUserController,
		errorUserController,
		loginUserController,
		normalRegisterUserController,
		routeUserTemplate,
		templateUserController,
		verifyUserController,
	},
} = require("~/controller/userController/indexUserController");

const userRoute = Router();

const {
	login,
	verify,
	registerAnonymous,
	// logoutNormal,
	// logoutAnonymous,
	registerNormal,
	error,
	template,
} = routeUserTemplate;

userRoute.post(registerNormal.route, normalRegisterUserController);
userRoute.post(registerAnonymous.route, anonymousRegisterUserController);

userRoute.post(login.route, loginUserController);

userRoute.post(verify.route, verifyUserController);

userRoute.get(error.route, errorUserController);

userRoute.get(template.route, templateUserController);

//* logout normal =>

//* logout anonymous =>
//
//
module.exports = { userRoute };
