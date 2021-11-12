const { Router } = require("express");

// const {
// registerNormalUserValidatorMiddleware,
// } = require("~/middleware/userMiddleware/registerNormalUserValidatorMiddleware");

// const {
// loginNormalUserValidatorMiddleware,
// } = require("~/middleware/userMiddleware/loginNormalUserValidatorMiddleware");

// const {
// existenceCheckerUserValidatorMiddleware,
// } = require("~/middleware/userMiddleware/existenceCheckerUserValidatorMiddleware");

const {
	signInNormalUserValidatorMiddleware,
} = require("~/middleware/userMiddleware/signInNormalUserValidatorMiddleware");

const { errorResponser } = require("~/middleware/errorResponser");

const {
	// anonymousRegisterUserController,
	// existenceCheckerUserController,
	// loginNormalUserController,
	// registerNormalUserController,
	routeUserTemplate,
	signInNormalUserController,
	// verifyLoginNormalUserController,

	errorUserController,
	templateUserController,
} = require("~/controller/userController/indexUserController");
const {
	verifySignInNormalUserController,
} = require("~/controller/userController/verifySignInNormalUserController");

const userRoute = Router();

const {
	// existenceChecker,
	// loginNormal,
	// logoutAnonymous,
	// logoutNormal,
	// registerAnonymous,
	// registerNormal,
	signInNormal,
	verifySignInNormal,
	// verifyLoginNormal,

	error,
	template,
} = routeUserTemplate;

// userRoute.use(existenceChecker.route, existenceCheckerUserValidatorMiddleware);
// userRoute.use(loginNormal.route, loginNormalUserValidatorMiddleware);
// userRoute.use(registerNormal.route, registerNormalUserValidatorMiddleware);

userRoute.use(signInNormal.route, signInNormalUserValidatorMiddleware);

//? comment: middleware: danger: errorResponser
userRoute.use(errorResponser);

userRoute.post(signInNormal.route, signInNormalUserController);
userRoute.post(verifySignInNormal.route, verifySignInNormalUserController);

// userRoute.post(existenceChecker.route, existenceCheckerUserController);

// userRoute.post(registerNormal.route, registerNormalUserController);
// userRoute.post(registerAnonymous.route, anonymousRegisterUserController);

// userRoute.post(loginNormal.route, loginNormalUserController);

// userRoute.post(verifyLoginNormal.route, verifyLoginNormalUserController);

userRoute.get(error.route, errorUserController);
userRoute.get(template.route, templateUserController);

//* logout normal =>

//* logout anonymous =>
//
//
module.exports = { userRoute };
