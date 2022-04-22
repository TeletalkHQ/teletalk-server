const { Router } = require("express");

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

const { ignoreMiddlewaresByUrl } = require("~/functions/utilities/utilsNoDeps");

const {
  cellphoneRoutes: {
    properties: {
      addContactRoute: { properties: addContact },
      addBlockRoute: { properties: addBlock },
      editContactRoute: { properties: editContact },
      removeBlockRoute: { properties: removeBlock },
      removeContactRoute: { properties: removeContact },
      getContactsRoute: { properties: getContacts },
    },
  },
} = require("~/variables/routes/cellphoneRoutes");

const cellphoneRouter = Router();

cellphoneRouter[getContacts.method](
  getContacts.url,
  getContactsCellphoneController
);

cellphoneRouter.use(
  ignoreMiddlewaresByUrl(
    getContacts.url,
    cellphoneValidatorMiddleware,
    selfStuffControllerMiddleware
  )
);

cellphoneRouter.use(addContact.url, contactValidatorMiddleware);

cellphoneRouter[addContact.method](
  addContact.url,
  addContactCellphoneController
);

cellphoneRouter[addBlock.method](addBlock.url, addBlockCellphoneController);

cellphoneRouter[removeBlock.method](
  removeBlock.url,
  removeBlockCellphoneController
);

cellphoneRouter[removeContact.method](
  removeContact.url,
  removeContactCellphoneController
);

cellphoneRouter[editContact.method](
  editContact.url,
  editContactCellphoneController
);

module.exports = { cellphoneRouter };
