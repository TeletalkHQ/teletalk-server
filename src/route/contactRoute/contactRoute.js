const { Router } = require("express");

const {
	addContactController,
} = require("~/controller/contactController/indexContactController");

const {
	routeContactTemplate: {
		add,
		// block, edit, error, remove, share, template
	},
} = require("~/template/contactTemplate/routeContactTemplate");

const {
	cellphoneValidatorMiddleware,
	errorResponser,
} = require("~/middleware/indexMiddleware");

const contactRoute = Router();

contactRoute.use(cellphoneValidatorMiddleware);

//* Call errorResponser before http methods. if there is error in validators,middlewares and ...the request is not entered to http methods and the error will be sent to the client.
contactRoute.use(errorResponser);

contactRoute.get(add.route, addContactController);

module.exports = { contactRoute };
