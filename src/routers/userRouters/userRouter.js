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
  cellphoneValidatorMDW,
} = require("~/middlewares/cellphoneValidatorMDW");

const {
  userRouterTemplate,
} = require("~/templates/routerTemplates/userRouterTemplate");

const userRoute = Router();

const {
  countries: { properties: countries },
  createNewUser: { properties: createNewUser },
  logoutNormal: { properties: logoutNormal },
  statusCheck: { properties: statusCheck }, //UNUSED
  signInNormal: { properties: signInNormal },
  verifySignInNormal: { properties: verifySignInNormal },
} = userRouterTemplate;

userRoute.use(signInNormal.url, cellphoneValidatorMDW);

userRoute[logoutNormal.method](logoutNormal.url, logoutNormalUserController);
userRoute[signInNormal.method](signInNormal.url, signInNormalUserController);
userRoute[verifySignInNormal.method](
  verifySignInNormal.url,
  verifySignInNormalUserController
);
userRoute[statusCheck.method](statusCheck.url, statusCheckUserController);

userRoute[createNewUser.method](createNewUser.url, createNewUserUserController);

//TODO Move it to otherRoute
userRoute[countries.method](countries.url, countriesUserController);

//* sign out normal =>
//
//* sign out anonymous =>
//
module.exports = { userRoute };
