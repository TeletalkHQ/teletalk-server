const { routeBuilder } = require("@/classes/RouteBuilder");

const { extractVersions, versionCalculator } = require("@/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const { METHODS } = require("@/variables/others/methods");

const userRouteBuilder = routeBuilder(baseUrls.user);

const createNewUser = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/user/createNewUser")
  .statusCode(200)
  .inputFields(fields.collection.fullName)
  .outputFields([
    {
      user: fields.statics.object(fields.collection.user),
    },
  ])
  .build();

const logout = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/user/logoutUser")
  .statusCode(200)
  .outputFields([{ ok: fields.single.ok }])
  .build();

const signIn = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/user/signInUser")
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
  .url("/user/getUserData")
  .statusCode(200)
  .outputFields([
    {
      user: fields.statics.object(fields.collection.userWithoutToken),
    },
  ])
  .build();

const getTargetUserData = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/user/getTargetUserData")
  .statusCode(200)
  .outputFields([
    {
      user: fields.statics.object(fields.collection.user),
    },
  ])
  .build();
const getPublicUserData = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/user/getPublicUserData")
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
  .url("/user/updatePersonalInfo")
  .statusCode(200)
  .inputFields(fields.collection.fullName)
  //TODO: Add bio, username, cellphone etc...
  .outputFields([fields.collection.fullName])
  .build();

const verifySignIn = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/user/verifySignInUser")
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
  getPublicUserData,
  getTargetUserData,
  logout,
  signIn,
  updatePersonalInfo,
  verifySignIn,
};

const userRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = {
  user: userRoutes,
};
