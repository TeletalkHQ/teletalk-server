const { Router } = require("express");

const { controllers } = require("@/controllers/controllers");

const { middlewares } = require("@/middlewares/middlewares");

const { routes } = require("@/routes/routes");

const userRouter = Router();

userRouter[routes.user.checkUserStatus.method](
  routes.user.checkUserStatus.url,
  controllers.checkUserStatus
);

userRouter[routes.user.createNewUser.method](
  routes.user.createNewUser.url,
  controllers.createNewUser
);

userRouter[routes.user.getUserData.method](
  routes.user.getUserData.url,
  controllers.getUserData
);

userRouter[routes.user.logoutNormal.method](
  routes.user.logoutNormal.url,
  middlewares.findCurrentUserFromDb,
  controllers.logoutNormal
);

userRouter[routes.user.signInNormal.method](
  routes.user.signInNormal.url,
  middlewares.cellphoneValidator,
  controllers.signInNormal
);

userRouter[routes.user.updatePersonalInfo.method](
  routes.user.updatePersonalInfo.url,
  middlewares.findCurrentUserFromDb,
  controllers.updatePersonalInfo
);

userRouter[routes.user.verifySignInNormal.method](
  routes.user.verifySignInNormal.url,
  middlewares.verificationCodeValidator,
  middlewares.verifyVerificationCode,
  controllers.verifySignInNormal
);

module.exports = { userRouter };
