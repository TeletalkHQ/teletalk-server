const { routeGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");
const {
  inputOutputFields: {
    bio,
    countryCode,
    countryName,
    firstName,
    lastName,
    phoneNumber,
    username,
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
} = require("@/variables/constants/initialValues/initialValue");

const userRouteBaseUrl = routeGenerator(true, "/user", true, "1.0.0");

const createNewUserRoute = routeGenerator(
  "post",
  "/normalUser/createNewNormalUser",
  200,
  "1.0.0",
  "Use for create new user for normal account",
  [{ firstName, lastName }],
  [
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
  ]
);

const logoutNormalRoute = routeGenerator(
  "post",
  "/normalUser/logoutNormalUser",
  200,
  "1.0.0",
  "Use for logout client as a normal account"
);
const signInNormalRoute = routeGenerator(
  "post",
  "/normalUser/signInNormalUser",
  200,
  "1.0.0",
  "Use for sign in client as a normal account",
  [
    {
      countryCode,
      countryName,
      phoneNumber,
    },
  ],
  [
    {
      [user]: {
        countryCode,
        countryName,
        phoneNumber,
        verifyToken,
      },
    },
  ]
);

const statusCheckRoute = routeGenerator(
  "get",
  "/normalUser/statusCheck",
  200,
  "1.0.0",
  "Use for check client availability as a normal account"
);

const verifySignInNormalRoute = routeGenerator(
  "post",
  "/normalUser/verifySignInNormalUser",
  200,
  "1.0.0",
  "Use for verify sign in (normal account) as normal account",
  [
    {
      verificationCode,
    },
  ],
  [
    {
      user: {
        privateId,
        firstName,
        lastName,
        bio,
        contacts,
        blacklist,
        username,
        phoneNumber,
        countryCode,
        countryName,
        chats,
        mainToken,
        newUser,
      },
    },
    { user: { [newUser]: newUser } },
  ]
);

const routes = {
  userRouteBaseUrl,
  createNewUserRoute,
  logoutNormalRoute,
  signInNormalRoute,
  statusCheckRoute,
  verifySignInNormalRoute,
};

const userRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = {
  userRoutes,
};
