const { Router } = require("express");
//TODO: Index imports
const {
  checkUserStatusUserController,
} = require("@/controllers/userControllers/checkUserStatusUserController");
const {
  createNewUserUserController,
} = require("@/controllers/userControllers/createNewUserUserController");
const {
  getUserDataUserController,
} = require("@/controllers/userControllers/getUserDataUserController");
const {
  logoutNormalUserController,
} = require("@/controllers/userControllers/logoutNormalUserController");
const {
  signInNormalUserController,
} = require("@/controllers/userControllers/signInNormalUserController");
const {
  updatePersonalInfoUserController,
} = require("@/controllers/userControllers/updatePersonalInfoUserController");
const {
  verifySignInNormalUserController,
} = require("@/controllers/userControllers/verifySignInNormalUserController");

const { middlewares } = require("@/middlewares/middlewares");

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
  middlewares.applyMiddlewaresByUrl(
    [signInNormalRoute.url],
    middlewares.cellphoneValidator
  )
);

userRouter[createNewUserRoute.method](
  createNewUserRoute.url,
  createNewUserUserController
);

userRouter[logoutNormalRoute.method](
  logoutNormalRoute.url,
  middlewares.findCurrentUserFromDb,
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
  middlewares.findCurrentUserFromDb,
  updatePersonalInfoUserController
);

userRouter[verifySignInNormalRoute.method](
  verifySignInNormalRoute.url,
  middlewares.verificationCodeValidator,
  middlewares.verifyVerificationCode,
  verifySignInNormalUserController
);

module.exports = { userRouter };
