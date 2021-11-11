const { Router } = require("express");

const {
	normalRegisterUserValidatorMiddleware,
} = require("~/middleware/userMiddleware/normalRegisterUserValidatorMiddleware");

const { errorResponser } = require("~/middleware/errorResponser");

const {
	anonymousRegisterUserController,
	normalLoginUserController,
	normalRegisterUserController,
	routeUserTemplate,
	templateUserController,
	errorUserController,
	verifyUserController,
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

userRoute.use(registerNormal.route, normalRegisterUserValidatorMiddleware);

userRoute.use(errorResponser);

userRoute.post(registerNormal.route, normalRegisterUserController);

userRoute.post(registerAnonymous.route, anonymousRegisterUserController);

userRoute.post(login.route, normalLoginUserController);

userRoute.post(verify.route, verifyUserController);

userRoute.get(error.route, errorUserController);
userRoute.get(template.route, templateUserController);

//* logout normal =>

//* logout anonymous =>
//
//
module.exports = { userRoute };
