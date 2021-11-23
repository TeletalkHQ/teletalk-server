const { Router } = require("express");

const { authDefaultMDW } = require("~/middleware/authDefaultMDW");
const { cellphoneValidatorMDW } = require("~/middleware/cellphoneValidatorMDW");
// const { contactValidatorMDW } = require("~/middleware/contactValidatorMDW");
const { errorResponser } = require("~/middleware/errorResponser");
const { findUserFromDB } = require("~/middleware/findUserFromDB");
const {
	targetUserFinderByCellphone,
} = require("~/middleware/contactMiddleware/targetUserFinderByCellphone");

const {
	addContactController,
} = require("~/controller/contactController/indexContactController");
const {
	blockContactController,
} = require("~/controller/contactController/blockContactController");

const {
	cellphoneRouteTemplate: { addContact, addBlock },
} = require("~/template/routeTemplate/cellphoneRouteTemplate");

const cellphoneRoute = Router();

cellphoneRoute.use(authDefaultMDW);
cellphoneRoute.use(cellphoneValidatorMDW);
// cellphoneRoute.use(contactValidatorMDW);

cellphoneRoute.use(findUserFromDB);

cellphoneRoute.use(targetUserFinderByCellphone);

//? comment :  middleware: danger : errorResponser
cellphoneRoute.use(errorResponser);

cellphoneRoute.post(addContact.route, addContactController);
cellphoneRoute.post(addBlock.route, blockContactController);

module.exports = { cellphoneRoute };
