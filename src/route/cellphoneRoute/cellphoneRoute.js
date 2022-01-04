const { Router } = require("express");

const { authDefaultMDW } = require("~/middleware/authDefaultMDW");
const { contactValidatorMDW } = require("~/middleware/contactValidatorMDW");
const { errorResponser } = require("~/middleware/errorResponser");
const { findUserFromDB } = require("~/middleware/findUserFromDB");
const { selfStuffControllerMDW } = require("~/middleware/selfStuffControllerMDW");
const { cellphoneValidatorMDW } = require("~/middleware/cellphoneValidatorMDW");
const {
	targetUserFinderByCellphoneMDW,
} = require("~/middleware/targetUserFinderByCellphoneMDW");

const {
	addContactCellphoneController,
} = require("~/controller/cellphoneController/indexCellphoneController");
const {
	addBlockCellphoneController,
} = require("~/controller/cellphoneController/addBlockCellphoneController");
const {
	removeBlockCellphoneController,
} = require("~/controller/cellphoneController/removeBlockCellphoneController");
const {
	removeContactCellphoneController,
} = require("~/controller/cellphoneController/removeContactCellphoneController");
const {
	editContactCellphoneController,
} = require("~/controller/cellphoneController/editContactCellphoneController");
const {
	getContactsCellphoneController,
} = require("~/controller/cellphoneController/getContactsCellphoneController");

const {
	cellphoneRouteTemplate: {
		addContact,
		addBlock,
		editContact,
		removeBlock,
		removeContact,
		getContacts,
	},
} = require("~/template/routeTemplate/cellphoneRouteTemplate");

const cellphoneRoute = Router();

cellphoneRoute.use(authDefaultMDW);

cellphoneRoute.get(
	getContacts.properties.route,
	findUserFromDB,
	getContactsCellphoneController,
);

cellphoneRoute.use(cellphoneValidatorMDW);
cellphoneRoute.use(selfStuffControllerMDW);
cellphoneRoute.use(findUserFromDB);

cellphoneRoute.use(targetUserFinderByCellphoneMDW);

cellphoneRoute.use(addContact.properties.route, contactValidatorMDW);
// ? comment :  middleware: danger : errorResponser
cellphoneRoute.use(errorResponser);

cellphoneRoute.post(addContact.properties.route, addContactCellphoneController);
cellphoneRoute.post(addBlock.properties.route, addBlockCellphoneController);
cellphoneRoute.post(removeBlock.properties.route, removeBlockCellphoneController);
cellphoneRoute.post(removeContact.properties.route, removeContactCellphoneController);
cellphoneRoute.post(editContact.properties.route, editContactCellphoneController);

module.exports = { cellphoneRoute };
