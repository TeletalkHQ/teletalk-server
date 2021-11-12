const {
	anonymousRegisterUserController,
} = require("~/controller/userController/anonymousRegisterUserController");

const {
	errorUserController,
} = require("~/controller/userController/errorUserController");

const {
	existenceCheckerUserController,
} = require("~/controller/userController/existenceCheckerUserController");

const {
	loginNormalUserController,
} = require("~/controller/userController/loginNormalUserController");

const {
	registerNormalUserController,
} = require("~/controller/userController/registerNormalUserController");

const {
	routeUserTemplate,
} = require("~/template/userTemplate/routeUserTemplate");

const {
	signInNormalUserController,
} = require("~/controller/userController/signInNormalUserController");

const {
	verifyLoginNormalUserController,
} = require("~/controller/userController/verifyLoginNormalUserController");

const {
	templateUserController,
} = require("~/controller/userController/templateUserController");

module.exports = {
	anonymousRegisterUserController,
	errorUserController,
	existenceCheckerUserController,
	loginNormalUserController,
	registerNormalUserController,
	routeUserTemplate,
	signInNormalUserController,
	templateUserController,
	verifyLoginNormalUserController,
};
