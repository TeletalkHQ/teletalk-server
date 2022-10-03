const { Router } = require("express");

const { controllers } = require("@/controllers/controllers");

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
  controllers.getContacts
);

cellphoneRouter[addContactRoute.method](
  addContactRoute.url,
  controllers.addContact
);

cellphoneRouter[addBlockRoute.method](addBlockRoute.url, controllers.addBlock);

cellphoneRouter[removeBlockRoute.method](
  removeBlockRoute.url,
  controllers.removeBlock
);

cellphoneRouter[removeContactRoute.method](
  removeContactRoute.url,
  controllers.removeContact
);

cellphoneRouter[editContactRoute.method](
  editContactRoute.url,
  controllers.editContact
);

module.exports = { cellphoneRouter };
