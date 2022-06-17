const { routeBuilder } = require("@/classes/Builders");
const {
  versionCalculator,
  extractVersions,
  addFullUrlToRouteObjects,
} = require("@/functions/utilities/utils");

const {
  inputOutputFields: {
    // bio,
    countryCode,
    countryName,
    firstName,
    lastName,
    phoneNumber,
    // username,
    verificationCode,
    verifyToken,
    privateId,
    user,
    mainToken,
    contacts,
    blacklist,
    chats,
    newUser,
  },
} = require("@/variables/others/initialOptions");

const userDataProps = {
  privateId,
  firstName,
  lastName,
  // bio,
  contacts,
  blacklist,
  // username,
  phoneNumber,
  countryCode,
  countryName,
  chats,
  mainToken,
  newUser,
};

const userRouteBaseUrl = routeBuilder
  .create()
  .url("/user")
  .version("1.0.0")
  .build();

const createNewUserRoute = routeBuilder
  .create()
  .method("post")
  .url("/normalUser/createNewNormalUser")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for create new user for normal account")
  .inputFields([{ firstName, lastName }])
  .outputFields([
    {
      [user]: {
        countryCode,
        countryName,
        firstName,
        lastName,
        mainToken,
        phoneNumber,
        privateId,
      },
    },
  ])
  .build();

const logoutNormalRoute = routeBuilder
  .create()
  .method("post")
  .url("/normalUser/logoutNormalUser")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for logout client as a normal account")
  .inputFields()
  .outputFields()
  .build();

const signInNormalRoute = routeBuilder
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
        verifyToken,
      },
    },
  ])
  .build();

const statusCheckRoute = routeBuilder
  .create()
  .method("get")
  .url("/normalUser/statusCheck")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for check client availability as a normal account")
  .inputFields()
  .outputFields()
  .build();

const getUserDataRoute = routeBuilder
  .create()
  .method("get")
  .url("/normalUser/getUserData")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for get user data")
  .inputFields([{}])
  .outputFields([
    {
      [user]: userDataProps,
    },
  ])
  .build();

const verifySignInNormalRoute = routeBuilder
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
      [user]: userDataProps,
    },
    { [user]: { [newUser]: newUser } },
  ])
  .build();

const routes = addFullUrlToRouteObjects(userRouteBaseUrl, {
  createNewUserRoute,
  getUserDataRoute,
  logoutNormalRoute,
  signInNormalRoute,
  statusCheckRoute,
  userRouteBaseUrl,
  verifySignInNormalRoute,
});

const userRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = {
  userRoutes,
};
