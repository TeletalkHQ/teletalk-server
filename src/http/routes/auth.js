const { httpRouteBuilder } = require("@/classes/routeBuilder/HttpRouteBuilder");

const { baseUrls } = require("@/http/routes/baseUrls");
const { fields } = require("@/variables/others/fields");

const { METHODS } = require("@/variables/others/methods");

const userRouteBuilder = httpRouteBuilder(baseUrls.auth);

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
  signIn,
  verify,
};

module.exports = {
  authRoutes,
};
