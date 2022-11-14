const { ioFieldMaker } = require("@/classes/IoFieldMaker");
const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const { ioFieldTypes } = require("@/variables/others/inputOutputFields");

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
      firstName: ioFieldMaker.create().type(ioFieldTypes.firstName).build(),
      lastName: ioFieldMaker.create().type(ioFieldTypes.lastName).build(),
    },
  ])
  .outputFields([
    {
      //FIXME: Add chatInfo (its empty)
      user: ioFieldMaker
        .create()
        .type(ioFieldTypes.user)
        .value({
          countryCode: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryCode)
            .build(),
          countryName: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryName)
            .build(),
          firstName: ioFieldMaker.create().type(ioFieldTypes.firstName).build(),
          lastName: ioFieldMaker.create().type(ioFieldTypes.lastName).build(),
          mainToken: ioFieldMaker.create().type(ioFieldTypes.mainToken).build(),
          phoneNumber: ioFieldMaker
            .create()
            .type(ioFieldTypes.phoneNumber)
            .build(),
          userId: ioFieldMaker.create().type(ioFieldTypes.userId).build(),
        })
        .build(),
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
  .outputFields([{ ok: ioFieldMaker.create().type(ioFieldTypes.ok).build() }])
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
      countryCode: ioFieldMaker.create().type(ioFieldTypes.countryCode).build(),
      countryName: ioFieldMaker.create().type(ioFieldTypes.countryName).build(),
      phoneNumber: ioFieldMaker.create().type(ioFieldTypes.phoneNumber).build(),
    },
  ])
  .outputFields([
    {
      user: ioFieldMaker
        .create()
        .type(ioFieldTypes.user)
        .value({
          countryCode: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryCode)
            .build(),
          countryName: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryName)
            .build(),
          phoneNumber: ioFieldMaker
            .create()
            .type(ioFieldTypes.phoneNumber)
            .build(),
          verifyToken: ioFieldMaker
            .create()
            .type(ioFieldTypes.verifyToken)
            .build(),
        })
        .build(),
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
      user: ioFieldMaker
        .create()
        .type(ioFieldTypes.user)
        .value({
          bio: ioFieldMaker.create().type(ioFieldTypes.bio).build(),
          blacklist: ioFieldMaker.create().type(ioFieldTypes.blacklist).build(),
          chatInfo: ioFieldMaker.create().type(ioFieldTypes.chatInfo).build(),
          contacts: ioFieldMaker.create().type(ioFieldTypes.contacts).build(),
          countryCode: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryCode)
            .build(),
          countryName: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryName)
            .build(),
          firstName: ioFieldMaker.create().type(ioFieldTypes.firstName).build(),
          lastName: ioFieldMaker.create().type(ioFieldTypes.lastName).build(),
          mainToken: ioFieldMaker.create().type(ioFieldTypes.mainToken).build(),
          phoneNumber: ioFieldMaker
            .create()
            .type(ioFieldTypes.phoneNumber)
            .build(),
          userId: ioFieldMaker.create().type(ioFieldTypes.userId).build(),
          username: ioFieldMaker
            .create()
            .type(ioFieldTypes.username)

            .build(),
        })
        .build(),
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
      user: ioFieldMaker
        .create()
        .type(ioFieldTypes.user)
        .value({
          bio: ioFieldMaker.create().type(ioFieldTypes.bio).build(),
          blacklist: ioFieldMaker.create().type(ioFieldTypes.blacklist).build(),
          chatInfo: ioFieldMaker.create().type(ioFieldTypes.chatInfo).build(),
          contacts: ioFieldMaker.create().type(ioFieldTypes.contacts).build(),
          countryCode: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryCode)
            .build(),
          countryName: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryName)
            .build(),
          firstName: ioFieldMaker.create().type(ioFieldTypes.firstName).build(),
          lastName: ioFieldMaker.create().type(ioFieldTypes.lastName).build(),
          mainToken: ioFieldMaker.create().type(ioFieldTypes.mainToken).build(),
          phoneNumber: ioFieldMaker
            .create()
            .type(ioFieldTypes.phoneNumber)
            .build(),
          userId: ioFieldMaker.create().type(ioFieldTypes.userId).build(),
          username: ioFieldMaker
            .create()
            .type(ioFieldTypes.username)

            .build(),
        })
        .build(),
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
      firstName: ioFieldMaker.create().type(ioFieldTypes.firstName).build(),
      lastName: ioFieldMaker.create().type(ioFieldTypes.lastName).build(),
    },
  ])
  .outputFields([
    {
      firstName: ioFieldMaker.create().type(ioFieldTypes.firstName).build(),
      lastName: ioFieldMaker.create().type(ioFieldTypes.lastName).build(),
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
      verificationCode: ioFieldMaker
        .create()
        .type(ioFieldTypes.verificationCode)
        .build(),
    },
  ])
  .outputFields([
    {
      user: ioFieldMaker
        .create()
        .type(ioFieldTypes.user)
        .value({
          bio: ioFieldMaker.create().type(ioFieldTypes.bio).build(),
          blacklist: ioFieldMaker.create().type(ioFieldTypes.blacklist).build(),
          chatInfo: ioFieldMaker.create().type(ioFieldTypes.chatInfo).build(),
          contacts: ioFieldMaker.create().type(ioFieldTypes.contacts).build(),
          countryCode: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryCode)
            .build(),
          countryName: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryName)
            .build(),
          firstName: ioFieldMaker.create().type(ioFieldTypes.firstName).build(),
          lastName: ioFieldMaker.create().type(ioFieldTypes.lastName).build(),
          mainToken: ioFieldMaker.create().type(ioFieldTypes.mainToken).build(),
          newUser: ioFieldMaker.create().type(ioFieldTypes.newUser).build(),
          phoneNumber: ioFieldMaker
            .create()
            .type(ioFieldTypes.phoneNumber)
            .build(),
          userId: ioFieldMaker.create().type(ioFieldTypes.userId).build(),
          username: ioFieldMaker.create().type(ioFieldTypes.username).build(),
        })
        .build(),
    },
    {
      user: ioFieldMaker
        .create()
        .type(ioFieldTypes.user)
        .value({
          newUser: ioFieldMaker.create().type(ioFieldTypes.newUser).build(),
        })
        .build(),
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
      chatInfo: ioFieldMaker
        .create()
        .type(ioFieldTypes.chatInfo)
        .value([
          { chatId: ioFieldMaker.create().type(ioFieldTypes.chatId).build() },
        ])
        .build(),
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
