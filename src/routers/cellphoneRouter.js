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

const { middlewares } = require("@/middlewares/middlewares");

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

cellphoneRouter.use(middlewares.findCurrentUserFromDb);

cellphoneRouter.use(
  middlewares.ignoreMiddlewaresByUrl(
    getContactsRoute.url,
    middlewares.cellphoneSelfStuffCheck
  )
);
cellphoneRouter.use(
  middlewares.ignoreMiddlewaresByUrl(
    [getContactsRoute.url, addContactRoute.url],
    middlewares.cellphoneValidator
  )
);
cellphoneRouter.use(
  middlewares.applyMiddlewaresByUrl(
    [editContactRoute.url, addContactRoute.url],
    middlewares.contactValidator
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
