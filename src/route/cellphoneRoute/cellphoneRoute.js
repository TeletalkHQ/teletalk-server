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

cellphoneRoute.get(getContacts.route, findUserFromDB, getContactsCellphoneController);

cellphoneRoute.use(cellphoneValidatorMDW);
cellphoneRoute.use(selfStuffControllerMDW);
cellphoneRoute.use(findUserFromDB);

cellphoneRoute.use(targetUserFinderByCellphoneMDW);

cellphoneRoute.use(addContact.route, contactValidatorMDW);
// ? comment :  middleware: danger : errorResponser
cellphoneRoute.use(errorResponser);

cellphoneRoute.post(addContact.route, addContactCellphoneController);
cellphoneRoute.post(addBlock.route, addBlockCellphoneController);
cellphoneRoute.post(removeBlock.route, removeBlockCellphoneController);
cellphoneRoute.post(removeContact.route, removeContactCellphoneController);
cellphoneRoute.post(editContact.route, editContactCellphoneController);

module.exports = { cellphoneRoute };
