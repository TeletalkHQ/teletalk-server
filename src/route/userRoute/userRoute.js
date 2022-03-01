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
const {
	countriesUserController,
} = require("~/controller/userController/countriesUserController");

const { cellphoneValidatorMDW } = require("~/middleware/cellphoneValidatorMDW");
const {
	createNewUserUserController,
} = require("~/controller/userController/createNewUserUserController");

const userRoute = Router();

const {
	countries: { properties: countries },
	createNewUser: { properties: createNewUser },
	logoutNormal: { properties: logoutNormal },
	statusCheck: { properties: statusCheck }, //UNUSED
	signInNormal: { properties: signInNormal },
	verifySignInNormal: { properties: verifySignInNormal },
	error: { properties: error },
	template: { properties: template },
} = userRouteTemplate;

userRoute.use(signInNormal.route, cellphoneValidatorMDW);

userRoute[logoutNormal.method](logoutNormal.route, logoutNormalUserController);
userRoute[signInNormal.method](signInNormal.route, signInNormalUserController);
userRoute[verifySignInNormal.method](
	verifySignInNormal.route,
	verifySignInNormalUserController,
);
userRoute[statusCheck.method](statusCheck.route, statusCheckUserController);

userRoute[createNewUser.method](createNewUser.route, createNewUserUserController);

//TODO Move it to otherRoute
userRoute[countries.method](countries.route, countriesUserController);

userRoute[error.method](error.route, errorUserController);
userRoute[template.method](template.route, templateUserController);

//* sign out normal =>
//
//* sign out anonymous =>
//
module.exports = { userRoute };
