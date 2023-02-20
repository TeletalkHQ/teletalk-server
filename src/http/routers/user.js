const { Router } = require("express");

const { controllers } = require("@/http/controllers");

const { middlewares } = require("@/http/middlewares");

const { routes } = require("@/http/routes");

const userRouter = Router();

userRouter.use(
  middlewares.applyMiddlewares(
    [
      routes.user.addContact.url,
      //FIXME: Add this two middleware into websocket
      // routes.user.addBlock.url,
      routes.user.removeBlock.url,
      routes.user.removeContact.url,
      routes.user.editContact.url,
    ],
    middlewares.cellphoneValidator,
    middlewares.selfStuffCheck
  )
);

userRouter.use(
  middlewares.applyMiddlewares(
    [routes.user.editContact.url, routes.user.addContact.url],
    middlewares.contactValidator
  )
);

//CLEANME: With some classes
userRouter[routes.user.getCurrentUserData.method](
  routes.user.getCurrentUserData.url,
  controllers.getCurrentUserData
);
userRouter[routes.user.getPublicUserData.method](
  routes.user.getPublicUserData.url,
  controllers.getPublicUserData
);
userRouter[routes.user.updatePublicUserData.method](
  routes.user.updatePublicUserData.url,
  controllers.updatePublicUserData
);

userRouter[routes.user.getContacts.method](
  routes.user.getContacts.url,
  controllers.getContacts
);

userRouter[routes.user.addContact.method](
  routes.user.addContact.url,
  controllers.addContact
);

userRouter[routes.user.removeBlock.method](
  routes.user.removeBlock.url,
  controllers.removeBlock
);

userRouter[routes.user.removeContact.method](
  routes.user.removeContact.url,
  controllers.removeContact
);

userRouter[routes.user.editContact.method](
  routes.user.editContact.url,
  controllers.editContact
);

module.exports = { userRouter };
