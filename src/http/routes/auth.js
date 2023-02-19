const { httpRouteBuilder } = require("@/classes/routeBuilder/HttpRouteBuilder");

const { baseUrls } = require("@/http/routes/baseUrls");
const { fields } = require("@/variables/others/fields");

const { METHODS } = require("@/variables/others/methods");

const userRouteBuilder = httpRouteBuilder(baseUrls.auth);

const createNewUser = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/create")
  .inputFields(fields.collection.fullName)
  .build();

const logout = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/logout")
  .build();

const signIn = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/signIn")
  .inputFields(fields.collection.cellphone)
  .build();

const verify = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/verify")
  .inputFields({
    verificationCode: fields.single.verificationCode,
  })
  .outputFields([
    {
      newUser: fields.single.newUser,
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
