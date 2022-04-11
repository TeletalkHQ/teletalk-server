const { Router } = require("express");

const { authDefaultMDW } = require("~/middlewares/authDefaultMDW");
const { contactValidatorMDW } = require("~/middlewares/contactValidatorMDW");
const { findUserFromDB } = require("~/middlewares/findUserFromDB");
const {
  selfStuffControllerMDW,
} = require("~/middlewares/selfStuffControllerMDW");
const {
  cellphoneValidatorMDW,
} = require("~/middlewares/cellphoneValidatorMDW");
const {
  targetUserFinderByCellphoneMDW,
} = require("~/middlewares/targetUserFinderByCellphoneMDW");

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
  addContactCellphoneController,
} = require("~/controllers/cellphoneControllers/addContactCellphoneController");

const {
  cellphoneRouterTemplate: {
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
  getContacts.url,
  findUserFromDB,
  getContactsCellphoneController
);

cellphoneRoute.use(cellphoneValidatorMDW);
cellphoneRoute.use(selfStuffControllerMDW);
cellphoneRoute.use(findUserFromDB);
cellphoneRoute.use(targetUserFinderByCellphoneMDW);
cellphoneRoute.use(addContact.url, contactValidatorMDW);

cellphoneRoute[addContact.method](
  addContact.url,
  addContactCellphoneController
);

cellphoneRoute[addBlock.method](addBlock.url, addBlockCellphoneController);

cellphoneRoute[removeBlock.method](
  removeBlock.url,
  removeBlockCellphoneController
);

cellphoneRoute[removeContact.method](
  removeContact.url,
  removeContactCellphoneController
);

cellphoneRoute[editContact.method](
  editContact.url,
  editContactCellphoneController
);

module.exports = { cellphoneRoute };
