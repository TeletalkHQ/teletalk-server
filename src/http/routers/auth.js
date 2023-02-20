const { Router } = require("express");

const { controllers } = require("@/http/controllers");

const { middlewares } = require("@/http/middlewares");

const { routes } = require("@/http/routes");

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

module.exports = { authRouter };
