const { Router } = require("express");
//TODO: Index imports
const {
  verifySignInNormalUserController,
} = require("@/controllers/userControllers/verifySignInNormalUserController");
const {
  signInNormalUserController,
} = require("@/controllers/userControllers/signInNormalUserController");
const {
  checkUserStatusUserController,
} = require("@/controllers/userControllers/checkUserStatusUserController");
const {
  logoutNormalUserController,
} = require("@/controllers/userControllers/logoutNormalUserController");
const {
  createNewUserUserController,
} = require("@/controllers/userControllers/createNewUserUserController");
const {
  getUserDataUserController,
} = require("@/controllers/userControllers/getUserDataUserController");

const {
  cellphoneValidatorMiddleware,
} = require("@/middlewares/cellphoneValidatorMiddleware");

const {
  userRoutes: {
    createNewUserRoute,
    getUserDataRoute,
    logoutNormalRoute,
    signInNormalRoute,
    statusCheckRoute,
    verifySignInNormalRoute,
  },
} = require("@/variables/routes/userRoutes");

const {
  applyMiddlewaresByUrlMiddleware,
} = require("@/middlewares/applyMiddlewaresByUrlMiddleware");

const userRouter = Router();

userRouter.use(
  applyMiddlewaresByUrlMiddleware(
    [signInNormalRoute.url],
    cellphoneValidatorMiddleware
  )
);

userRouter[createNewUserRoute.method](
  createNewUserRoute.url,
  createNewUserUserController
);

userRouter[logoutNormalRoute.method](
  logoutNormalRoute.url,
  logoutNormalUserController
);

userRouter[getUserDataRoute.method](
  getUserDataRoute.url,
  getUserDataUserController
);

userRouter[signInNormalRoute.method](
  signInNormalRoute.url,
  signInNormalUserController
);

userRouter[statusCheckRoute.method](
  statusCheckRoute.url,
  checkUserStatusUserController
);

userRouter[verifySignInNormalRoute.method](
  verifySignInNormalRoute.url,
  verifySignInNormalUserController
);

module.exports = { userRouter };
