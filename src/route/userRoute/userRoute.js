const { Router } = require("express");

const { contactValidatorMDW } = require("~/middleware/contactValidatorMDW");

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
const { cellphoneValidatorMDW } = require("~/middleware/cellphoneValidatorMDW");

const userRoute = Router();

const {
	signInNormal,
	verifySignInNormal,

	error,
	template,
} = userRouteTemplate;

userRoute.use(signInNormal.route, cellphoneValidatorMDW);
//? comment: middleware: danger: errorResponser
userRoute.use(errorResponser);

userRoute.post(signInNormal.route, signInNormalUserController);
//TODO Add MDW for verify controller
userRoute.post(verifySignInNormal.route, verifySignInNormalUserController);

userRoute.get(error.route, errorUserController);
userRoute.get(template.route, templateUserController);

//* sign out normal =>
//
//* sign out anonymous =>
//
module.exports = { userRoute };
