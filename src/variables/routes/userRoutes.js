const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const {
  initialOptions: {
    inputOutputFields: {
      bio,
      countryCode,
      countryName,
      firstName,
      lastName,
      mainToken,
      newUser,
      phoneNumber,
      privateId,
      user,
      username,
      verificationCode,
      verifyToken,
    },
    userDataDefaultProps,
  },
} = require("@/variables/others/inputOutputFields");

const userRouteBuilder = routeBuilder("/user");

const userRouteBaseUrl = userRouteBuilder.create().createBaseUrlObject("1.0.0");

const createNewUserRoute = userRouteBuilder
  .create()
  .method("post")
  .url("/normalUser/createNewNormalUser")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for create new user for normal account")
  .inputFields([
    {
      firstName,
      lastName,
    },
  ])
  .outputFields([
    {
      [user]: {
        countryCode,
        countryName,
        firstName,
        lastName,
        mainToken,
        phoneNumber,
        privateId,
      },
    },
  ])
  .build();

const logoutNormalRoute = userRouteBuilder
  .create()
  .method("post")
  .url("/normalUser/logoutNormalUser")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for logout client as a normal account")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const signInNormalRoute = userRouteBuilder
  .create()
  .method("post")
  .url("/normalUser/signInNormalUser")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for sign in client as a normal account")
  .inputFields([
    {
      countryCode,
      countryName,
      phoneNumber,
    },
  ])
  .outputFields([
    {
      [user]: {
        countryCode,
        countryName,
        phoneNumber,
        [verificationCode]: true,
        verifyToken,
      },
    },
  ])
  .build();

const checkUserStatusRoute = userRouteBuilder
  .create()
  .method("get")
  .url("/normalUser/statusCheck")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for check client availability as a normal account")
  .inputFields([{}])
  .outputFields([
    {
      [user]: {
        ...userDataDefaultProps,
        [bio]: true,
        [username]: true,
      },
    },
  ])
  .build();

const getUserDataRoute = userRouteBuilder
  .create()
  .method("get")
  .url("/normalUser/getUserData")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for get user data")
  .inputFields([{}])
  .outputFields([
    {
      [user]: {
        ...userDataDefaultProps,
        [bio]: true,
        [username]: true,
      },
    },
  ])
  .build();

const updatePersonalInfoRoute = userRouteBuilder
  .create()
  .method("patch")
  .url("/normalUser/updatePersonalInfo")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for user update personal info")
  .inputFields([
    {
      firstName,
      lastName,
    },
  ])
  .outputFields([
    {
      firstName,
      lastName,
    },
  ])
  .build();

const verifySignInNormalRoute = userRouteBuilder
  .create()
  .method("post")
  .url("/normalUser/verifySignInNormalUser")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for verify sign in (normal account) as normal account")
  .inputFields([
    {
      verificationCode,
    },
  ])
  .outputFields([
    {
      [user]: {
        ...userDataDefaultProps,
        [bio]: true,
        newUser,
        [username]: true,
      },
    },
    {
      [user]: {
        [newUser]: newUser,
      },
    },
  ])
  .build();

const routes = {
  checkUserStatusRoute,
  createNewUserRoute,
  getUserDataRoute,
  logoutNormalRoute,
  signInNormalRoute,
  updatePersonalInfoRoute,
  userRouteBaseUrl,
  verifySignInNormalRoute,
};

const userRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = {
  userRoutes,
};
