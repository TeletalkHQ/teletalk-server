const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const { METHODS } = require("@/variables/others/methods");

const userRouteBuilder = routeBuilder(baseUrls.user);

const createNewUser = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/normalUser/createNewNormalUser")
  .statusCode(200)
  .inputFields(fields.collection.fullName)
  .outputFields([
    {
      user: fields.statics.object(fields.collection.user),
    },
  ])
  .build();

const logoutNormal = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/normalUser/logoutNormalUser")
  .statusCode(200)
  .outputFields([{ ok: fields.single.ok }])
  .build();

const signInNormal = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/normalUser/signInNormalUser")
  .statusCode(200)
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
  .method(METHODS.GET)
  .url("/normalUser/getUserData")
  .statusCode(200)
  .outputFields([
    {
      user: fields.statics.object(fields.collection.user),
    },
  ])
  .build();

const getTargetUserData = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/normalUser/getTargetUserData")
  .statusCode(200)
  .outputFields([
    {
      user: fields.statics.object(fields.collection.user),
    },
  ])
  .build();
const getPublicUserInfo = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/normalUser/getPublicUserInfo")
  .statusCode(200)
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
  .method(METHODS.PATCH)
  .url("/normalUser/updatePersonalInfo")
  .statusCode(200)
  .inputFields(fields.collection.fullName)
  //TODO: Add bio, username, cellphone etc...
  .outputFields([fields.collection.fullName])
  .build();

const verifySignInNormal = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/normalUser/verifySignInNormalUser")
  .statusCode(200)
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
