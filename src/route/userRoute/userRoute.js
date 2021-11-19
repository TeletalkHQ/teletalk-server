const { Router } = require("express");

const {
	signInNormalValidatorUserMDW,
} = require("~/middleware/userMiddleware/signInNormalValidatorUserMDW");

const { errorResponser } = require("~/middleware/errorResponser");

const {
	userRouteTemplate,
	signInNormalUserController,

	errorUserController,
	templateUserController,
} = require("~/controller/userController/indexUserController");
const {
	verifySignInNormalUserController,
} = require("~/controller/userController/verifySignInNormalUserController");

const userRoute = Router();

const {
	signInNormal,
	verifySignInNormal,

	error,
	template,
} = userRouteTemplate;

userRoute.use(signInNormal.route, signInNormalValidatorUserMDW);

//? comment: middleware: danger: errorResponser
userRoute.use(errorResponser);

userRoute.post(signInNormal.route, signInNormalUserController);
userRoute.post(verifySignInNormal.route, verifySignInNormalUserController);

userRoute.get(error.route, errorUserController);
userRoute.get(template.route, templateUserController);

//* sign out normal =>
//
//* sign out anonymous =>
//
module.exports = { userRoute };
