const { Router } = require("express");

const {
  contactValidatorMiddleware,
} = require("@/middlewares/contactValidatorMiddleware");
const {
  selfStuffControllerMiddleware,
} = require("@/middlewares/selfStuffControllerMiddleware");
const {
  cellphoneValidatorMiddleware,
} = require("@/middlewares/cellphoneValidatorMiddleware");
const {
  findCurrentUserFromDb,
} = require("@/middlewares/findCurrentUserFromDb");

const {
  addBlockCellphoneController,
} = require("@/controllers/cellphoneControllers/addBlockCellphoneController");
const {
  removeBlockCellphoneController,
} = require("@/controllers/cellphoneControllers/removeBlockCellphoneController");
const {
  removeContactCellphoneController,
} = require("@/controllers/cellphoneControllers/removeContactCellphoneController");
const {
  editContactCellphoneController,
} = require("@/controllers/cellphoneControllers/editContactCellphoneController");
const {
  getContactsCellphoneController,
} = require("@/controllers/cellphoneControllers/getContactsCellphoneController");
const {
  addContactCellphoneController,
} = require("@/controllers/cellphoneControllers/addContactCellphoneController");

const {
  ignoreMiddlewaresByUrlMiddleware,
} = require("@/middlewares/ignoreMiddlewaresByUrlMiddleware");

const {
  cellphoneRoutes: {
    addContactRoute,
    addBlockRoute,
    editContactRoute,
    removeBlockRoute,
    removeContactRoute,
    getContactsRoute,
  },
} = require("@/variables/routes/cellphoneRoutes");
const {
  applyMiddlewaresByUrlMiddleware,
} = require("@/middlewares/applyMiddlewaresByUrlMiddleware");

const cellphoneRouter = Router();

cellphoneRouter.use(findCurrentUserFromDb);

cellphoneRouter.use(
  ignoreMiddlewaresByUrlMiddleware(
    getContactsRoute.url,
    selfStuffControllerMiddleware
  )
);
cellphoneRouter.use(
  ignoreMiddlewaresByUrlMiddleware(
    [getContactsRoute.url, addContactRoute.url],
    cellphoneValidatorMiddleware
  )
);
cellphoneRouter.use(
  applyMiddlewaresByUrlMiddleware(
    [editContactRoute.url, addContactRoute.url],
    contactValidatorMiddleware
  )
);

cellphoneRouter[getContactsRoute.method](
  getContactsRoute.url,
  getContactsCellphoneController
);

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
