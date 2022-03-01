const { Router } = require("express");

const { authDefaultMDW } = require("~/middlewares/authDefaultMDW");
const { contactValidatorMDW } = require("~/middlewares/contactValidatorMDW");
const { findUserFromDB } = require("~/middlewares/findUserFromDB");
const { selfStuffControllerMDW } = require("~/middlewares/selfStuffControllerMDW");
const { cellphoneValidatorMDW } = require("~/middlewares/cellphoneValidatorMDW");
const {
	targetUserFinderByCellphoneMDW,
} = require("~/middlewares/targetUserFinderByCellphoneMDW");

const {
	addContactCellphoneController,
} = require("~/controllers/cellphoneControllers/indexCellphoneController");
const {
	addBlockCellphoneController,
} = require("~/controllers/cellphoneControllers/addBlockCellphoneController");
const {
	removeBlockCellphoneController,
} = require("~/controllers/cellphoneControllers/removeBlockCellphoneController");
const {
	removeContactCellphoneController,
} = require("~/controllers/cellphoneControllers/removeContactCellphoneController");
const {
	editContactCellphoneController,
} = require("~/controllers/cellphoneControllers/editContactCellphoneController");
const {
	getContactsCellphoneController,
} = require("~/controllers/cellphoneControllers/getContactsCellphoneController");

const {
	cellphoneRouteTemplate: {
		addContact: { properties: addContact },
		addBlock: { properties: addBlock },
		editContact: { properties: editContact },
		removeBlock: { properties: removeBlock },
		removeContact: { properties: removeContact },
		getContacts: { properties: getContacts },
	},
} = require("~/templates/routerTemplates/cellphoneRouterTemplate");

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
