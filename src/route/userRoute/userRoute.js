const { Router } = require("express");

const {
	registerNormalUserValidatorMiddleware,
} = require("~/middleware/userMiddleware/registerNormalUserValidatorMiddleware");

const {
	loginNormalUserValidatorMiddleware,
} = require("~/middleware/userMiddleware/loginNormalUserValidatorMiddleware");

const {
	existenceCheckerUserValidatorMiddleware,
} = require("~/middleware/userMiddleware/existenceCheckerUserValidatorMiddleware");

const { errorResponser } = require("~/middleware/errorResponser");

const {
	anonymousRegisterUserController,
	errorUserController,
	existenceCheckerUserController,
	loginNormalUserController,
	registerNormalUserController,
	routeUserTemplate,
	templateUserController,
	verifyLoginNormalUserController,
} = require("~/controller/userController/indexUserController");

const userRoute = Router();

const {
	error,
	existenceChecker,
	loginNormal,
	// logoutAnonymous,
	// logoutNormal,
	registerAnonymous,
	registerNormal,
	template,
	verifyLoginNormal,
} = routeUserTemplate;

userRoute.use(existenceChecker.route, existenceCheckerUserValidatorMiddleware);
userRoute.use(loginNormal.route, loginNormalUserValidatorMiddleware);
userRoute.use(registerNormal.route, registerNormalUserValidatorMiddleware);

//? comment: middleware: danger: errorResponser
userRoute.use(errorResponser);

userRoute.post(existenceChecker.route, existenceCheckerUserController);

userRoute.post(registerNormal.route, registerNormalUserController);
userRoute.post(registerAnonymous.route, anonymousRegisterUserController);

userRoute.post(loginNormal.route, loginNormalUserController);

// userRoute.post(verifyLoginNormal.route, verifyLoginNormalUserController);

userRoute.get(error.route, errorUserController);
userRoute.get(template.route, templateUserController);

//* logout normal =>

//* logout anonymous =>
//
//
module.exports = { userRoute };
