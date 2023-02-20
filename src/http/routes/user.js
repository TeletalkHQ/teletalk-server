const { httpRouteBuilder } = require("@/classes/routeBuilder/HttpRouteBuilder");

const { baseUrls } = require("@/http/routes/baseUrls");
const { fields } = require("@/variables/others/fields");

const { METHODS } = require("@/variables/others/methods");

const userRouteBuilder = httpRouteBuilder(baseUrls.user);

const getCurrentUserData = userRouteBuilder
  .create()
  .method(METHODS.GET)
  .url("/getCurrentUserData")
  .outputFields([
    {
      user: fields.statics.object(fields.collection.user),
    },
  ])
  .build();

const getPublicUserData = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/getPublicUserData")
  .inputFields({
    userId: fields.single.userId,
  })
  .outputFields([
    {
      publicUserData: fields.statics.object({
        ...fields.collection.fullName,
        bio: fields.single.bio,
        userId: fields.single.userId,
        username: fields.single.username,
      }),
    },
  ])
  .build();

const userRoutes = {
  getCurrentUserData,
  getPublicUserData,
};

module.exports = {
  userRoutes,
};
