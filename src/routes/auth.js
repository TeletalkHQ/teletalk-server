const { routeBuilder } = require("@/classes/RouteBuilder");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const { METHODS } = require("@/variables/others/methods");

const userRouteBuilder = routeBuilder(baseUrls.auth);

const createNewUser = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/createNewUser")
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
  .url("/logout")
  .statusCode(200)
  .outputFields([{ ok: fields.single.ok }])
  .build();

const signIn = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/signIn")
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

const verify = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/verify")
  .statusCode(200)
  .inputFields({
    verificationCode: fields.single.verificationCode,
  })
  .outputFields([
    {
      user: fields.statics.object({
        ...fields.collection.user,
        //TODO: Token and newUser out of userData
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

const authRoutes = {
  createNewUser,
  logout,
  signIn,
  verify,
};

module.exports = {
  authRoutes,
};
