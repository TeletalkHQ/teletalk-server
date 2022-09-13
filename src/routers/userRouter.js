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
  updatePersonalInfoUserController,
} = require("@/controllers/userControllers/updatePersonalInfoUserController");

const {
  cellphoneValidatorMiddleware,
} = require("@/middlewares/cellphoneValidatorMiddleware");
const {
  applyMiddlewaresByUrlMiddleware,
} = require("@/middlewares/applyMiddlewaresByUrlMiddleware");
const {
  findCurrentUserFromDb,
} = require("@/middlewares/findCurrentUserFromDb");
const {
  validateVerificationCodeMiddleware,
} = require("@/middlewares/validateVerificationCodeMiddleware");
const {
  verifyVerificationCodeMiddleware,
} = require("@/middlewares/verifyVerificationCodeMiddleware");

const {
  userRoutes: {
    checkUserStatusRoute,
    createNewUserRoute,
    getUserDataRoute,
    logoutNormalRoute,
    signInNormalRoute,
    updatePersonalInfoRoute,
    verifySignInNormalRoute,
  },
} = require("@/variables/routes/userRoutes");

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

userRouter[checkUserStatusRoute.method](
  checkUserStatusRoute.url,
  checkUserStatusUserController
);

userRouter[updatePersonalInfoRoute.method](
  updatePersonalInfoRoute.url,
  findCurrentUserFromDb,
  updatePersonalInfoUserController
);

userRouter[verifySignInNormalRoute.method](
  verifySignInNormalRoute.url,
  validateVerificationCodeMiddleware,
  verifyVerificationCodeMiddleware,
  verifySignInNormalUserController
);

module.exports = { userRouter };
