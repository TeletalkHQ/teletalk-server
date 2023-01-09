const { Router } = require("express");

const { controllers } = require("@/controllers");

const { middlewares } = require("@/middlewares");

const { routes } = require("@/routes");

const authRouter = Router();

authRouter[routes.auth.signIn.method](
  routes.auth.signIn.url,
  middlewares.cellphoneValidator,
  controllers.signIn
);
authRouter[routes.auth.verify.method](
  routes.auth.verify.url,
  middlewares.verificationCodeValidator,
  middlewares.verifyVerificationCode,
  controllers.verify
);
authRouter[routes.auth.createNewUser.method](
  routes.auth.createNewUser.url,
  controllers.createNewUser
);
authRouter[routes.auth.logout.method](
  routes.auth.logout.url,
  controllers.logout
);

module.exports = { authRouter };
