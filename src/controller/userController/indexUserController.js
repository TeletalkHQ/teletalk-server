const { errorUserController } = require("~/controller/userController/errorUserController");

const { userRouteTemplate } = require("~/template/routeTemplate/userRouteTemplate");

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
	userRouteTemplate,
	signInNormalUserController,
	templateUserController,
	verifySignInNormalUserController,
};
