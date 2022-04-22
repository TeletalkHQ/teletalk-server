const { routeGenerator } = require("~/functions/utilities/generators");

const userRouteBaseUrl = routeGenerator(true, "/user", true, "1.0.0");

const createNewUserRoute = routeGenerator(
  "post",
  "/normalUser/createNewNormalUser",
  200,
  "1.0.0",
  "Use for create new user for normal account"
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
  "Use for sign in client as a normal account"
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
  "Use for verify sign in (normal account) as normal account"
);

const userRoutes = {
  info: {
    version: "1.0.0",
  },

  properties: {
    userRouteBaseUrl,
    createNewUserRoute,
    logoutNormalRoute,
    signInNormalRoute,
    statusCheckRoute,
    verifySignInNormalRoute,
  },
};

module.exports = {
  userRoutes,
};
