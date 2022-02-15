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
const {
	logoutNormalUserController,
} = require("~/controller/userController/logoutNormalUserController");

const { cellphoneValidatorMDW } = require("~/middleware/cellphoneValidatorMDW");

const userRoute = Router();

const {
	logoutNormal,
	statusCheck, //UNUSED
	signInNormal,
	verifySignInNormal,

	error,
	template,
} = userRouteTemplate;

userRoute.use(signInNormal.properties.route, cellphoneValidatorMDW);

userRoute[logoutNormal.properties.method](
	logoutNormal.properties.route,
	logoutNormalUserController,
);
userRoute[signInNormal.properties.method](
	signInNormal.properties.route,
	signInNormalUserController,
);
userRoute[verifySignInNormal.properties.method](
	verifySignInNormal.properties.route,
	verifySignInNormalUserController,
);
userRoute[statusCheck.properties.method](
	statusCheck.properties.route,
	statusCheckUserController,
);

userRoute[error.properties.method](error.properties.route, errorUserController);
userRoute[template.properties.method](template.properties.route, templateUserController);

//* sign out normal =>
//
//* sign out anonymous =>
//
module.exports = { userRoute };
