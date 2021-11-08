const {
	normalRegisterUserController,
} = require("~/controller/userController/normalRegisterUserController");
const {
	anonymousRegisterUserController,
} = require("~/controller/userController/anonymousRegisterUserController");
const {
	normalLoginUserController,
} = require("~/controller/userController/normalLoginUserController");
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

const indexUserController = {
	normalRegisterUserController,
	anonymousRegisterUserController,
	normalLoginUserController,
	verifyUserController,
	routeUserTemplate,
	errorUserController,
	templateUserController,
};

module.exports = { indexUserController };
