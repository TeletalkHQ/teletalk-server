const { Router } = require("express");

const {
	addContactController,
} = require("~/controller/contactController/indexContactController");

const {
	cellphoneValidatorMiddleware,
} = require("~/middleware/cellphoneValidatorMiddleware");

const { errorResponser } = require("~/middleware/errorResponser");

const {
	routeContactTemplate: {
		add,
		// block, edit, error, remove, share, template
	},
} = require("~/template/contactTemplate/routeContactTemplate");

const contactRoute = Router();

contactRoute.use(cellphoneValidatorMiddleware);

//? comment : danger : errorResponser
contactRoute.use(errorResponser);

contactRoute.get(add.route, addContactController);

module.exports = { contactRoute };
