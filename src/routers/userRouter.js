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

userRouter[checkUserStatusRoute.method](
  checkUserStatusRoute.url,
  controllers.checkUserStatus
);

userRouter[createNewUserRoute.method](
  createNewUserRoute.url,
  controllers.createNewUser
);

userRouter[getUserDataRoute.method](
  getUserDataRoute.url,
  controllers.getUserData
);

userRouter[logoutNormalRoute.method](
  logoutNormalRoute.url,
  middlewares.findCurrentUserFromDb,
  controllers.logoutNormal
);

userRouter[signInNormalRoute.method](
  signInNormalRoute.url,
  middlewares.cellphoneValidator,
  controllers.signInNormal
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
