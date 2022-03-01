const { Router } = require("express");

const { authDefaultMDW } = require("~/middleware/authDefaultMDW");
const { contactValidatorMDW } = require("~/middleware/contactValidatorMDW");
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
		addContact: { properties: addContact },
		addBlock: { properties: addBlock },
		editContact: { properties: editContact },
		removeBlock: { properties: removeBlock },
		removeContact: { properties: removeContact },
		getContacts: { properties: getContacts },
	},
} = require("~/template/routeTemplate/cellphoneRouteTemplate");

const cellphoneRoute = Router();

cellphoneRoute.use(authDefaultMDW);

cellphoneRoute[getContacts.method](
	getContacts.route,
	findUserFromDB,
	getContactsCellphoneController,
);

cellphoneRoute.use(cellphoneValidatorMDW);
cellphoneRoute.use(selfStuffControllerMDW);
cellphoneRoute.use(findUserFromDB);
cellphoneRoute.use(targetUserFinderByCellphoneMDW);
cellphoneRoute.use(addContact.route, contactValidatorMDW);

cellphoneRoute[addContact.method](addContact.route, addContactCellphoneController);
cellphoneRoute[addBlock.method](addBlock.route, addBlockCellphoneController);
cellphoneRoute[removeBlock.method](removeBlock.route, removeBlockCellphoneController);
cellphoneRoute[removeContact.method](removeContact.route, removeContactCellphoneController);
cellphoneRoute[editContact.method](editContact.route, editContactCellphoneController);

module.exports = { cellphoneRoute };
