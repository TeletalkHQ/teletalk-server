const { Router } = require("express");

const {
	normalRegisterUserController,
} = require("~/controller/userController/normalRegisterUserController");
const {
	anonymousRegisterUserController,
} = require("~/controller/userController/anonymousRegisterUserController");
const {
	loginUserController,
} = require("~/controller/userController/loginUserController");
const {
	verifyUserController,
} = require("~/controller/userController/verifyUserController");
const {
	routeUserTemplate,
} = require("~/template/userTemplate/routeUserTemplate");

const {
	errorUserController,
} = require("~/controller/userController/errorUserController");

const {
	templateUserController,
} = require("~/controller/userController/templateUserController");

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
