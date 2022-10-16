const { Router } = require("express");

const { controllers } = require("@/controllers/controllers");

const { middlewares } = require("@/middlewares");

const { routes } = require("@/routes/routes");

const cellphoneRouter = Router();

cellphoneRouter.use(middlewares.findCurrentUserFromDb);

cellphoneRouter.use(
  middlewares.ignoreMiddlewaresByUrl(
    routes.cellphone.getContacts.url,
    middlewares.cellphoneSelfStuffCheck
  )
);
cellphoneRouter.use(
  middlewares.ignoreMiddlewaresByUrl(
    [routes.cellphone.getContacts.url, routes.cellphone.addContact.url],
    middlewares.cellphoneValidator
  )
);
cellphoneRouter.use(
  middlewares.applyMiddlewaresByUrl(
    [routes.cellphone.editContact.url, routes.cellphone.addContact.url],
    middlewares.contactValidator
  )
);

cellphoneRouter[routes.cellphone.getContacts.method](
  routes.cellphone.getContacts.url,
  controllers.getContacts
);

cellphoneRouter[routes.cellphone.addContact.method](
  routes.cellphone.addContact.url,
  controllers.addContact
);

cellphoneRouter[routes.cellphone.addBlock.method](
  routes.cellphone.addBlock.url,
  controllers.addBlock
);

cellphoneRouter[routes.cellphone.removeBlock.method](
  routes.cellphone.removeBlock.url,
  controllers.removeBlock
);

cellphoneRouter[routes.cellphone.removeContact.method](
  routes.cellphone.removeContact.url,
  controllers.removeContact
);

cellphoneRouter[routes.cellphone.editContact.method](
  routes.cellphone.editContact.url,
  controllers.editContact
);

module.exports = { cellphoneRouter };
