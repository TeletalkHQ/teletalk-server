const { Router } = require("express");

const {
  addBlockCellphoneController,
} = require("@/controllers/cellphoneControllers/addBlockCellphoneController");
const {
  addContactCellphoneController,
} = require("@/controllers/cellphoneControllers/addContactCellphoneController");
const {
  editContactCellphoneController,
} = require("@/controllers/cellphoneControllers/editContactCellphoneController");
const {
  getContactsCellphoneController,
} = require("@/controllers/cellphoneControllers/getContactsCellphoneController");
const {
  removeBlockCellphoneController,
} = require("@/controllers/cellphoneControllers/removeBlockCellphoneController");
const {
  removeContactCellphoneController,
} = require("@/controllers/cellphoneControllers/removeContactCellphoneController");

const {
  applyMiddlewaresByUrlMiddleware,
} = require("@/middlewares/applyMiddlewaresByUrlMiddleware");
const {
  cellphoneSelfStuffCheckMiddleware,
} = require("@/middlewares/cellphoneSelfStuffCheckMiddleware");
const {
  cellphoneValidatorMiddleware,
} = require("@/middlewares/cellphoneValidatorMiddleware");
const {
  contactValidatorMiddleware,
} = require("@/middlewares/contactValidatorMiddleware");
const {
  findCurrentUserFromDb,
} = require("@/middlewares/findCurrentUserFromDb");
const {
  ignoreMiddlewaresByUrlMiddleware,
} = require("@/middlewares/ignoreMiddlewaresByUrlMiddleware");

const {
  cellphoneRoutes: {
    addBlockRoute,
    addContactRoute,
    editContactRoute,
    getContactsRoute,
    removeBlockRoute,
    removeContactRoute,
  },
} = require("@/variables/routes/cellphoneRoutes");

const cellphoneRouter = Router();

cellphoneRouter.use(findCurrentUserFromDb);

cellphoneRouter.use(
  ignoreMiddlewaresByUrlMiddleware(
    getContactsRoute.url,
    cellphoneSelfStuffCheckMiddleware
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
