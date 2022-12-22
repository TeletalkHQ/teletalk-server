const { Router } = require("express");

const { controllers } = require("@/controllers");

const { middlewares } = require("@/middlewares");

const { routes } = require("@/routes");

const userRouter = Router();

userRouter.use(
  middlewares.ignoreMiddlewaresByUrl(
    [
      routes.user.signIn.url,
      routes.user.createNewUser.url,
      routes.user.verify.url,
    ],
    middlewares.checkCurrentUserStatus,
    middlewares.attachCurrentUserId
  )
);

userRouter[routes.user.getUserData.method](
  routes.user.getUserData.url,
  controllers.getUserData
);

userRouter[routes.user.createNewUser.method](
  routes.user.createNewUser.url,
  controllers.createNewUser
);

userRouter[routes.user.getTargetUserData.method](
  routes.user.getTargetUserData.url,
  controllers.getTargetUserData
);

userRouter[routes.user.getPublicUserData.method](
  routes.user.getPublicUserData.url,
  controllers.getPublicUserData
);

userRouter[routes.user.logout.method](
  routes.user.logout.url,
  controllers.logout
);

userRouter[routes.user.signIn.method](
  routes.user.signIn.url,
  middlewares.cellphoneValidator,
  controllers.signIn
);

userRouter[routes.user.updatePersonalInfo.method](
  routes.user.updatePersonalInfo.url,
  controllers.updatePersonalInfo
);

userRouter[routes.user.verify.method](
  routes.user.verify.url,
  middlewares.verificationCodeValidator,
  middlewares.verifyVerificationCode,
  controllers.verify
);

module.exports = { userRouter };
