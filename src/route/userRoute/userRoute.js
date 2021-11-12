const { Router } = require("express");

const {
	registerNormalUserValidatorMiddleware,
} = require("~/middleware/userMiddleware/registerNormalUserValidatorMiddleware");

const { errorResponser } = require("~/middleware/errorResponser");

const {
	anonymousRegisterUserController,
	loginNormalUserController,
	registerNormalUserController,
	routeUserTemplate,
	templateUserController,
	errorUserController,
	verifyLoginNormalUserController,
} = require("~/controller/userController/indexUserController");
const {
	loginNormalUserValidatorMiddleware,
} = require("~/middleware/userMiddleware/loginNormalUserValidatorMiddleware");

const userRoute = Router();

const {
	loginNormal,
	verifyLoginNormal,
	registerAnonymous,
	// logoutNormal,
	// logoutAnonymous,
	registerNormal,
	error,
	template,
} = routeUserTemplate;

userRoute.use(registerNormal.route, registerNormalUserValidatorMiddleware);
userRoute.use(loginNormal.route, loginNormalUserValidatorMiddleware);

//? comment : danger : errorResponser
userRoute.use(errorResponser);

userRoute.post(registerNormal.route, registerNormalUserController);
userRoute.post(registerAnonymous.route, anonymousRegisterUserController);

userRoute.post(loginNormal.route, loginNormalUserController);

userRoute.post(verifyLoginNormal.route, verifyLoginNormalUserController);

userRoute.get(error.route, errorUserController);
userRoute.get(template.route, templateUserController);

//* logout normal =>

//* logout anonymous =>
//
//
module.exports = { userRoute };
