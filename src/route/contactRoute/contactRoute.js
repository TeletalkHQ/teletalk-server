const { Router } = require("express");

const {
	addContactController,
} = require("~/controller/contactController/indexContactController");

const {
	routeContactTemplate: { add, block, edit, error, remove, share, template },
} = require("~/template/contactTemplate/routeContactTemplate");

const {
	cellphoneValidatorMiddleware,
} = require("~/middleware/indexMiddleware");

const contactRoute = Router();

//* Validate cellphone =>
contactRoute.use(cellphoneValidatorMiddleware);

contactRoute.get(add.route, addContactController);

module.exports = { contactRoute };
