const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const {
  ioFieldTypes,
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
      firstName: ioFieldTypes.firstName,
      lastName: ioFieldTypes.lastName,
    },
  ])
  .outputFields([
    {
      //FIXME: Add chatInfo (its empty)
      user: {
        countryCode: ioFieldTypes.countryCode,
        countryName: ioFieldTypes.countryName,
        firstName: ioFieldTypes.firstName,
        lastName: ioFieldTypes.lastName,
        mainToken: ioFieldTypes.mainToken,
        phoneNumber: ioFieldTypes.phoneNumber,
        userId: ioFieldTypes.userId,
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
  .outputFields([{ ok: ioFieldTypes.ok }])
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
      countryCode: ioFieldTypes.countryCode,
      countryName: ioFieldTypes.countryName,
      phoneNumber: ioFieldTypes.phoneNumber,
    },
  ])
  .outputFields([
    {
      user: {
        countryCode: ioFieldTypes.countryCode,
        countryName: ioFieldTypes.countryName,
        phoneNumber: ioFieldTypes.phoneNumber,
        verificationCode: true,
        verifyToken: ioFieldTypes.verifyToken,
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
      user: {
        ...userDataDefaultIoFields,
        bio: true,
        username: true,
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
      user: {
        ...userDataDefaultIoFields,
        bio: true,
        username: true,
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
      firstName: ioFieldTypes.firstName,
      lastName: ioFieldTypes.lastName,
    },
  ])
  .outputFields([
    {
      firstName: ioFieldTypes.firstName,
      lastName: ioFieldTypes.lastName,
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
      verificationCode: ioFieldTypes.verificationCode,
    },
  ])
  .outputFields([
    {
      user: {
        ...userDataDefaultIoFields,
        bio: true,
        newUser: ioFieldTypes.newUser,
        username: true,
      },
    },
    {
      user: {
        newUser: ioFieldTypes.newUser,
      },
    },
  ])
  .build();

const getChatInfo = userRouteBuilder
  .create()
  .method("get")
  .url("/getChatInfo")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for get user chat ids")
  .inputFields([{}])
  .outputFields([
    {
      chatInfo: [{ chatId: ioFieldTypes.chatId }],
    },
  ])
  .build();

const routes = {
  checkUserStatus,
  createNewUser,
  getChatInfo,
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
