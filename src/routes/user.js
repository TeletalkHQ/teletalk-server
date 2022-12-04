const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const userRouteBuilder = routeBuilder(baseUrls.user);

const createNewUser = userRouteBuilder
  .create()
  .method("post")
  .url("/normalUser/createNewNormalUser")
  .statusCode(200)
  .description("Use for create new user for normal account")
  .inputFields(fields.collection.fullName)
  .outputFields([
    {
      user: fields.statics.object(fields.collection.user),
    },
  ])
  .build();

const logoutNormal = userRouteBuilder
  .create()
  .method("post")
  .url("/normalUser/logoutNormalUser")
  .statusCode(200)
  .description("Use for logout client as a normal account")
  .outputFields([{ ok: fields.single.ok }])
  .build();

const signInNormal = userRouteBuilder
  .create()
  .method("post")
  .url("/normalUser/signInNormalUser")
  .statusCode(200)
  .description("Use for sign in client as a normal account")
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      user: fields.statics.object({
        ...fields.collection.cellphone,
        token: fields.single.token,
      }),
    },
  ])
  .build();

const getUserData = userRouteBuilder
  .create()
  .method("get")
  .url("/normalUser/getUserData")
  .statusCode(200)
  .description("Use for check client availability as a normal account")
  .outputFields([
    {
      user: fields.statics.object(fields.collection.user),
    },
  ])
  .build();

const getTargetUserData = userRouteBuilder
  .create()
  .method("post")
  .url("/normalUser/getTargetUserData")
  .statusCode(200)
  .description("Use for get user data")
  .outputFields([
    {
      user: fields.statics.object(fields.collection.user),
    },
  ])
  .build();
const getPublicUserInfo = userRouteBuilder
  .create()
  .method("post")
  .url("/normalUser/getPublicUserInfo")
  .statusCode(200)
  .description("Use for get user data")
  .inputFields({
    userId: fields.single.userId,
  })
  .outputFields([
    {
      publicUserInfo: fields.statics.object({
        ...fields.collection.fullName,
        bio: fields.single.bio,
        userId: fields.single.userId,
        username: fields.single.username,
      }),
    },
  ])
  .build();

const updatePersonalInfo = userRouteBuilder
  .create()
  .method("patch")
  .url("/normalUser/updatePersonalInfo")
  .statusCode(200)
  .description("Use for user update personal info")
  .inputFields(fields.collection.fullName)
  //TODO: Add bio, username, cellphone etc...
  .outputFields([fields.collection.fullName])
  .build();

const verifySignInNormal = userRouteBuilder
  .create()
  .method("post")
  .url("/normalUser/verifySignInNormalUser")
  .statusCode(200)
  .description("Use for verify sign in (normal account) as normal account")
  .inputFields({
    verificationCode: fields.single.verificationCode,
  })
  .outputFields([
    {
      user: fields.statics.object({
        ...fields.collection.user,
        newUser: fields.single.newUser,
      }),
    },
    {
      user: fields.statics.object({
        newUser: fields.single.newUser,
      }),
    },
  ])
  .build();

const routes = {
  getUserData,
  createNewUser,
  getPublicUserInfo,
  getTargetUserData,
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
