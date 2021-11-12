const {
	registerNormalUserController,
} = require("~/controller/userController/registerNormalUserController");
const {
	anonymousRegisterUserController,
} = require("~/controller/userController/anonymousRegisterUserController");
const {
	loginNormalUserController,
} = require("~/controller/userController/loginNormalUserController");
const {
	verifyLoginNormalUserController,
} = require("~/controller/userController/verificationCodeValidator");
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
	registerNormalUserController,
	anonymousRegisterUserController,
	loginNormalUserController,
	verifyLoginNormalUserController,
	routeUserTemplate,
	errorUserController,
	templateUserController,
};
