const { Router } = require("express");

const {
	userRouteTemplate,
	signInNormalUserController,
	errorUserController,
	templateUserController,
} = require("~/controller/userController/indexUserController");
const {
	verifySignInNormalUserController,
} = require("~/controller/userController/verifySignInNormalUserController");
const {
	statusCheckUserController,
} = require("~/controller/userController/statusCheckUserController");

const { cellphoneValidatorMDW } = require("~/middleware/cellphoneValidatorMDW");

const userRoute = Router();

const {
	statusCheck,
	signInNormal,
	verifySignInNormal,

	error,
	template,
} = userRouteTemplate;

userRoute.use(signInNormal.properties.route, cellphoneValidatorMDW);

userRoute.post(signInNormal.properties.route, signInNormalUserController);
userRoute.post(verifySignInNormal.properties.route, verifySignInNormalUserController);
userRoute.get(statusCheck.properties.route, statusCheckUserController);

userRoute.get(error.properties.route, errorUserController);
userRoute.get(template.properties.route, templateUserController);

//* sign out normal =>
//
//* sign out anonymous =>
//
module.exports = { userRoute };
