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
      addContactRoute: { properties: addContactRoute },
      addBlockRoute: { properties: addBlockRoute },
      editContactRoute: { properties: editContactRoute },
      removeBlockRoute: { properties: removeBlockRoute },
      removeContactRoute: { properties: removeContactRoute },
      getContactsRoute: { properties: getContactsRoute },
    },
  },
} = require("~/variables/routes/cellphoneRoutes");

const cellphoneRouter = Router();

cellphoneRouter[getContactsRoute.method](
  getContactsRoute.url,
  getContactsCellphoneController
);

cellphoneRouter.use(
  ignoreMiddlewaresByUrl(
    getContactsRoute.url,
    cellphoneValidatorMiddleware,
    selfStuffControllerMiddleware
  )
);

cellphoneRouter.use(addContactRoute.url, contactValidatorMiddleware);

cellphoneRouter[addContactRoute.method](
  addContactRoute.url,
  addContactCellphoneController
);

cellphoneRouter[addBlockRoute.method](
  addBlockRoute.url,
  addBlockCellphoneController
);

cellphoneRouter[removeBlockRoute.method](
  removeBlockRoute.url,
  removeBlockCellphoneController
);

cellphoneRouter[removeContactRoute.method](
  removeContactRoute.url,
  removeContactCellphoneController
);

cellphoneRouter[editContactRoute.method](
  editContactRoute.url,
  editContactCellphoneController
);

module.exports = { cellphoneRouter };
