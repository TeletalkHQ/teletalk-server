const { Router } = require("express");

const { middlewares } = require("@/http/middlewares");

const userRouter = Router();

userRouter.use(
  middlewares.applyMiddlewares(
    [
      //FIXME: Add this two middleware into websocket
      // routes.user.addContact.url,
      // routes.user.addBlock.url,
      // routes.user.removeBlock.url,
      // routes.user.removeContact.url,
      // routes.user.editContact.url,
    ],
    middlewares.cellphoneValidator,
    middlewares.selfStuffCheck
  )
);

// userRouter.use(
//   middlewares.applyMiddlewares(
//     //FIXME: Add this two middleware into websocket
//     [routes.user.editContact.url, routes.user.addContact.url],
//     middlewares.contactValidator
//   )
// );

//CLEANME: With some classes

module.exports = { userRouter };
