const {
	anonymousRegisterUserController,
} = require("~/controller/userController/anonymousRegisterUserController");

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
	verifyLoginNormalUserController,
} = require("~/controller/userController/verifyLoginNormalUserController");

const {
	routeUserTemplate,
} = require("~/template/userTemplate/routeUserTemplate");

const {
	errorUserController,
} = require("~/controller/userController/errorUserController");

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
	templateUserController,
	verifyLoginNormalUserController,
};
