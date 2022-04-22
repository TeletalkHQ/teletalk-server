const { Router } = require("express");

const {
  cellphoneValidatorMiddleware,
} = require("~/middlewares/cellphoneValidatorMiddleware");

const {
  verifySignInNormalUserController,
} = require("~/controllers/userControllers/verifySignInNormalUserController");
const {
  signInNormalUserController,
} = require("~/controllers/userControllers/signInNormalUserController");
const {
  statusCheckUserController,
} = require("~/controllers/userControllers/statusCheckUserController");
const {
  logoutNormalUserController,
} = require("~/controllers/userControllers/logoutNormalUserController");
const {
  createNewUserUserController,
} = require("~/controllers/userControllers/createNewUserUserController");

const {
  userRoutes: {
    properties: {
      createNewUserRoute: { properties: createNewUser },
      logoutNormalRoute: { properties: logoutNormal },
      statusCheckRoute: { properties: statusCheck }, //UNUSED
      signInNormalRoute: { properties: signInNormal },
      verifySignInNormalRoute: { properties: verifySignInNormal },
    },
  },
} = require("~/variables/routes/userRoutes");

const userRouter = Router();

userRouter.use(signInNormal.url, cellphoneValidatorMiddleware);

userRouter[signInNormal.method](signInNormal.url, signInNormalUserController);
userRouter[verifySignInNormal.method](
  verifySignInNormal.url,
  verifySignInNormalUserController
);

userRouter[statusCheck.method](statusCheck.url, statusCheckUserController);

userRouter[createNewUser.method](
  createNewUser.url,
  createNewUserUserController
);

userRouter[logoutNormal.method](logoutNormal.url, logoutNormalUserController);

module.exports = { userRouter };
