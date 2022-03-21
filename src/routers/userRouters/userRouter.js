const { Router } = require("express");

const {
  userRouterTemplate,
  signInNormalUserController,
  errorUserController,
  templateUserController,
} = require("~/controllers/userControllers/indexUserController");
const {
  verifySignInNormalUserController,
} = require("~/controllers/userControllers/verifySignInNormalUserController");
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
  cellphoneValidatorMDW,
} = require("~/middlewares/cellphoneValidatorMDW");
const {
  createNewUserUserController,
} = require("~/controllers/userControllers/createNewUserUserController");

const userRoute = Router();

const {
  countries: { properties: countries },
  createNewUser: { properties: createNewUser },
  logoutNormal: { properties: logoutNormal },
  statusCheck: { properties: statusCheck }, //UNUSED
  signInNormal: { properties: signInNormal },
  verifySignInNormal: { properties: verifySignInNormal },
} = userRouterTemplate;

userRoute.use(signInNormal.route, cellphoneValidatorMDW);

userRoute[logoutNormal.method](logoutNormal.route, logoutNormalUserController);
userRoute[signInNormal.method](signInNormal.route, signInNormalUserController);
userRoute[verifySignInNormal.method](
  verifySignInNormal.route,
  verifySignInNormalUserController
);
userRoute[statusCheck.method](statusCheck.route, statusCheckUserController);

userRoute[createNewUser.method](
  createNewUser.route,
  createNewUserUserController
);

//TODO Move it to otherRoute
userRoute[countries.method](countries.route, countriesUserController);

//* sign out normal =>
//
//* sign out anonymous =>
//
module.exports = { userRoute };
