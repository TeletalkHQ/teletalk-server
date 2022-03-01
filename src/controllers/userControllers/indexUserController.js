const { errorUserController } = require("~/controllers/userControllers/errorUserController");

const { userRouterTemplate } = require("~/templates/routerTemplates/userRouterTemplate");

const {
	signInNormalUserController,
} = require("~/controllers/userControllers/signInNormalUserController");

const {
	verifySignInNormalUserController,
} = require("~/controllers/userControllers/verifySignInNormalUserController");

const {
	templateUserController,
} = require("~/controllers/userControllers/templateUserController");

module.exports = {
	errorUserController,
	userRouterTemplate,
	signInNormalUserController,
	templateUserController,
	verifySignInNormalUserController,
};
