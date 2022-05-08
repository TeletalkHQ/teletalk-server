const { Router } = require("express");

const {
  cellphoneValidatorMiddleware,
} = require("@/middlewares/cellphoneValidatorMiddleware");

const {
  verifySignInNormalUserController,
} = require("@/controllers/userControllers/verifySignInNormalUserController");
const {
  signInNormalUserController,
} = require("@/controllers/userControllers/signInNormalUserController");
const {
  statusCheckUserController,
} = require("@/controllers/userControllers/statusCheckUserController");
const {
  logoutNormalUserController,
} = require("@/controllers/userControllers/logoutNormalUserController");
const {
  createNewUserUserController,
} = require("@/controllers/userControllers/createNewUserUserController");

const {
  userRoutes: {
    createNewUserRoute,
    logoutNormalRoute,
    statusCheckRoute,
    signInNormalRoute,
    verifySignInNormalRoute,
  },
} = require("@/variables/routes/userRoutes");

const userRouter = Router();

userRouter.use(signInNormalRoute.url, cellphoneValidatorMiddleware);

userRouter[signInNormalRoute.method](
  signInNormalRoute.url,
  signInNormalUserController
);
userRouter[verifySignInNormalRoute.method](
  verifySignInNormalRoute.url,
  verifySignInNormalUserController
);

userRouter[statusCheckRoute.method](
  statusCheckRoute.url,
  statusCheckUserController
);

userRouter[createNewUserRoute.method](
  createNewUserRoute.url,
  createNewUserUserController
);

userRouter[logoutNormalRoute.method](
  logoutNormalRoute.url,
  logoutNormalUserController
);

module.exports = { userRouter };
