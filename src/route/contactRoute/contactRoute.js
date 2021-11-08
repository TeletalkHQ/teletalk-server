const { Router } = require("express");

const {
	addContactController,
} = require("~/controller/contactController/indexContactController");

const {
	routeContactTemplate: { add, block, edit, error, remove, share, template },
} = require("~/template/contactTemplate/routeContactTemplate");

const contactRoute = Router();

contactRoute.get(add.route, addContactController);

module.exports = { contactRoute };
