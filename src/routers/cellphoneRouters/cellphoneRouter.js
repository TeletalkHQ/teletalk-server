const { Router } = require("express");

const {
  authDefaultMiddleware,
} = require("~/middlewares/authDefaultMiddleware");
const {
  contactValidatorMiddleware,
} = require("~/middlewares/contactValidatorMiddleware");
const {
  selfStuffControllerMiddleware,
} = require("~/middlewares/selfStuffControllerMiddleware");
const {
  cellphoneValidatorMiddleware,
} = require("~/middlewares/cellphoneValidatorMiddleware");
const {
  targetUserFinderByCellphoneMiddleware,
} = require("~/middlewares/targetUserFinderByCellphoneMiddleware");

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
  cellphoneRoutes: {
    addContact: { properties: addContact },
    addBlock: { properties: addBlock },
    editContact: { properties: editContact },
    removeBlock: { properties: removeBlock },
    removeContact: { properties: removeContact },
    getContacts: { properties: getContacts },
  },
} = require("~/variables/routes/cellphoneRoutes");
const { ignoreMiddlewaresByUrl } = require("~/functions/utilities/utils");

const cellphoneRoute = Router();

cellphoneRoute.use(authDefaultMiddleware);

cellphoneRoute[getContacts.method](
  getContacts.url,
  getContactsCellphoneController
);

cellphoneRoute.use(
  ignoreMiddlewaresByUrl(
    getContacts.url,
    cellphoneValidatorMiddleware,
    selfStuffControllerMiddleware,
    targetUserFinderByCellphoneMiddleware
  )
);

cellphoneRoute.use(addContact.url, contactValidatorMiddleware);

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
