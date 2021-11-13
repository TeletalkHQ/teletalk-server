const {
	errorUserController,
} = require("~/controller/userController/errorUserController");

const {
	routeUserTemplate,
} = require("~/template/userTemplate/routeUserTemplate");

const {
	signInNormalUserController,
} = require("~/controller/userController/signInNormalUserController");

const {
	verifySignInNormalUserController,
} = require("~/controller/userController/verifySignInNormalUserController");

const {
	templateUserController,
} = require("~/controller/userController/templateUserController");

module.exports = {
	errorUserController,
	routeUserTemplate,
	signInNormalUserController,
	templateUserController,
	verifySignInNormalUserController,
};
