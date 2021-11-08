const {
	normalRegisterAuthController,
} = require("~/controller/authController/normalRegisterAuthController");
const {
	anonymousRegisterAuthController,
} = require("~/controller/authController/anonymousRegisterAuthController");
const {
	loginAuthController,
} = require("~/controller/authController/normalLoginAuthController");
const {
	verifyAuthController,
} = require("~/controller/authController/verifyAuthController");
const {
	routeAuthTemplate,
} = require("~/template/authTemplate/routeAuthTemplate");

const {
	errorAuthController,
} = require("~/controller/authController/errorAuthController");

const {
	templateAuthController,
} = require("~/controller/authController/templateAuthController");

const indexUserController = {
	normalRegisterAuthController,
	anonymousRegisterAuthController,
	loginAuthController,
	verifyAuthController,
	routeAuthTemplate,
	errorAuthController,
	templateAuthController,
};

module.exports = { indexUserController };
