const { Router } = require("express");

const { controllers } = require("@/controllers");

const { middlewares } = require("@/middlewares");

const { routes } = require("@/routes");
const {
  applyMiddlewaresByUrl,
} = require("@/middlewares/applyMiddlewaresByUrl");

const userRouter = Router();

userRouter.use(
  applyMiddlewaresByUrl(
    [routes.user.logout.url, routes.user.updatePersonalInfo.url],
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

userRouter[routes.user.getPublicUserInfo.method](
  routes.user.getPublicUserInfo.url,
  controllers.getPublicUserInfo
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

userRouter[routes.user.verifySignIn.method](
  routes.user.verifySignIn.url,
  middlewares.verificationCodeValidator,
  middlewares.verifyVerificationCode,
  controllers.verifySignIn
);

module.exports = { userRouter };
