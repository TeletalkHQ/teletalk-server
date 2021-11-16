const { Router } = require("express");

const { authDefaultMDW } = require("~/middleware/authDefaultMDW");
const { cellphoneValidatorMDW } = require("~/middleware/cellphoneValidatorMDW");
const { errorResponser } = require("~/middleware/errorResponser");
const { findUserFromDB } = require("~/middleware/findUserFromDB");
const {
	targetUserFinderByCellphone,
} = require("~/middleware/contactMiddleware/targetUserFinderByCellphone");

const {
	addContactController,
} = require("~/controller/contactController/indexContactController");

const {
	routeContactTemplate: {
		add,
		block,
		// edit, error, remove, share, template
	},
} = require("~/template/contactTemplate/routeContactTemplate");
const {
	blockContactController,
} = require("~/controller/contactController/blockContactController");

const contactRoute = Router();

contactRoute.use(authDefaultMDW);
contactRoute.use(findUserFromDB);

contactRoute.use(cellphoneValidatorMDW);

contactRoute.use(targetUserFinderByCellphone);

//? comment :  middleware: danger : errorResponser
contactRoute.use(errorResponser);

contactRoute.post(add.route, addContactController);
contactRoute.post(block.route, blockContactController);

module.exports = { contactRoute };
