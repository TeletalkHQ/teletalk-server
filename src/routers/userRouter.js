const { Router } = require("express");

const { controllers } = require("@/controllers/controllers");

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
  controllers.createNewUser
);

userRouter[logoutNormalRoute.method](
  logoutNormalRoute.url,
  middlewares.findCurrentUserFromDb,
  controllers.logoutNormal
);

userRouter[getUserDataRoute.method](
  getUserDataRoute.url,
  controllers.getUserData
);

userRouter[signInNormalRoute.method](
  signInNormalRoute.url,
  controllers.signInNormal
);

userRouter[checkUserStatusRoute.method](
  checkUserStatusRoute.url,
  controllers.checkUserStatus
);

userRouter[updatePersonalInfoRoute.method](
  updatePersonalInfoRoute.url,
  middlewares.findCurrentUserFromDb,
  controllers.updatePersonalInfo
);

userRouter[verifySignInNormalRoute.method](
  verifySignInNormalRoute.url,
  middlewares.verificationCodeValidator,
  middlewares.verifyVerificationCode,
  controllers.verifySignInNormal
);

module.exports = { userRouter };
