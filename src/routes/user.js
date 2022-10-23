const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const {
  inputOutputFields: {
    bio,
    countryCode,
    countryName,
    firstName,
    lastName,
    mainToken,
    newUser,
    ok,
    phoneNumber,
    userId,
    user,
    username,
    verificationCode,
    verifyToken,
  },
  userDataDefaultIoFields,
} = require("@/variables/others/inputOutputFields");

const userRouteBuilder = routeBuilder(baseUrls.user);

const createNewUser = userRouteBuilder
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
        userId,
      },
    },
  ])
  .build();

const logoutNormal = userRouteBuilder
  .create()
  .method("post")
  .url("/normalUser/logoutNormalUser")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for logout client as a normal account")
  .inputFields([{}])
  .outputFields([{ ok }])
  .build();

const signInNormal = userRouteBuilder
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

const checkUserStatus = userRouteBuilder
  .create()
  .method("get")
  .url("/normalUser/checkUserStatus")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for check client availability as a normal account")
  .inputFields([{}])
  .outputFields([
    {
      [user]: {
        ...userDataDefaultIoFields,
        [bio]: true,
        [username]: true,
      },
    },
  ])
  .build();

const getUserData = userRouteBuilder
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
        ...userDataDefaultIoFields,
        [bio]: true,
        [username]: true,
      },
    },
  ])
  .build();

const updatePersonalInfo = userRouteBuilder
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

const verifySignInNormal = userRouteBuilder
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
        ...userDataDefaultIoFields,
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
  checkUserStatus,
  createNewUser,
  getUserData,
  logoutNormal,
  signInNormal,
  updatePersonalInfo,
  verifySignInNormal,
};

const userRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = {
  user: userRoutes,
};
