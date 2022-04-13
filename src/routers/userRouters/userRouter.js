const { Router } = require("express");

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
  countriesUserController,
} = require("~/controllers/userControllers/countriesUserController");
const {
  createNewUserUserController,
} = require("~/controllers/userControllers/createNewUserUserController");

const {
  cellphoneValidatorMiddleware,
} = require("~/middlewares/cellphoneValidatorMiddleware");

const { userRoutes } = require("~/variables/routes/userRoutes");

const userRouter = Router();

const {
  countries: { properties: countries },
  createNewUser: { properties: createNewUser },
  logoutNormal: { properties: logoutNormal },
  statusCheck: { properties: statusCheck }, //UNUSED
  signInNormal: { properties: signInNormal },
  verifySignInNormal: { properties: verifySignInNormal },
} = userRoutes;

userRouter.use(signInNormal.url, cellphoneValidatorMiddleware);

userRouter[logoutNormal.method](logoutNormal.url, logoutNormalUserController);
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

//TODO Move it to otherRoute
userRouter[countries.method](countries.url, countriesUserController);

//* sign out normal =>
//
//* sign out anonymous =>
//
module.exports = { userRouter };
