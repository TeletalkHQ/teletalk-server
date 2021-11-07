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

const indexUserController = {
	normalRegisterUserController,
	anonymousRegisterUserController,
	loginUserController,
	verifyUserController,
	routeUserTemplate,
	errorUserController,
	templateUserController,
};

module.exports = { indexUserController };
