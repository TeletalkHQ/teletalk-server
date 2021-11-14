const { Router } = require("express");

const { authDefaultMDW } = require("~/middleware/authDefaultMDW");
const { cellphoneValidatorMDW } = require("~/middleware/cellphoneValidatorMDW");
const { errorResponser } = require("~/middleware/errorResponser");

const {
	addContactController,
} = require("~/controller/contactController/indexContactController");

const {
	routeContactTemplate: {
		add,
		// block, edit, error, remove, share, template
	},
} = require("~/template/contactTemplate/routeContactTemplate");

const contactRoute = Router();

contactRoute.use(authDefaultMDW);

contactRoute.use(cellphoneValidatorMDW);

//? comment : danger : errorResponser
contactRoute.use(errorResponser);

contactRoute.get(add.route, addContactController);

module.exports = { contactRoute };
