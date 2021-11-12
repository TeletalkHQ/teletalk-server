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

module.exports = {
	registerNormalUserController,
	anonymousRegisterUserController,
	loginNormalUserController,
	verifyUserController,
	routeUserTemplate,
	errorUserController,
	templateUserController,
};
